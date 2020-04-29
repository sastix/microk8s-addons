import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';

import {catchError, map, mergeMap, tap, toArray} from 'rxjs/operators';
import {ApiService} from '../core/api.service';
import {HttpResponse} from '@angular/common/http';
import {
  Addon,
  AddonStatus,
  ServiceInfo,
  PodView,
  ServiceView,
  DeploymentView,
  ReplicaSetView,
  Status,
  K8sOverview
} from '../core/models';
import { forkJoin } from 'rxjs';

@Injectable()
export class DashboardService {
  constructor(private apiService: ApiService) {
  }

  getAddons(): Observable<Addon[]> {
    return this.apiService.post('status')
      .pipe(map((r: HttpResponse<Status>) => r.body.addons));
  }

  getSnapInfo(): Observable<Object> {
    return this.apiService.post('services')
      .pipe(
        mergeMap((r: HttpResponse<Object>) => from(Object.entries(r.body))),
        map((s: Array<[string, string]>) => new Object({
          name: s[0],
          mode: s[1].toString().split(',')[1].trim(),
          status: s[1].toString().split(',')[2].trim()
        })),
        toArray()
      );
  }

  getMicroK8sOverview(): Observable<string> {
    return this.getMicroK8sOverviewObj().pipe(
      map( r => JSON.stringify(r, null, 4))
    )
  }

  getMicroK8sOverviewObj(): Observable<K8sOverview> {
    let podsResponse = this.apiService.get('k8s/api/v1/pods', null, 'json', true);
    let servicesResponse = this.apiService.get('k8s/api/v1/services', null, 'json', true);
    let deploymentsResponse = this.apiService.get('k8s/apis/apps/v1/deployments', null, 'json', true);
    let replicaSetsResponse = this.apiService.get('k8s/apis/apps/v1/replicasets', null, 'json', true);

    const allData = forkJoin([podsResponse, servicesResponse, deploymentsResponse, replicaSetsResponse]);

    // return allData.pipe(
    //   map(values => { const [pods, services, deployments, replicaSets] = values}),
    //   map(v => this.createOverview( v['pods'], v['services'], v['deployments'], v['replicaSets']) ),
    //   map(r => r.toString())
    // );


    let c = this.createOverview;
    let dashThis = this;
    const observable = new Observable<K8sOverview>(function subscribe(observer) {
      allData.subscribe(values => {
        const [ pods , services, deployments, replicaSets ] = values;
        console.log(services);
        console.log(deployments);
        console.log(replicaSets);
        //observer.next(JSON.stringify(pods, null, 4));
        observer.next(c(pods, services, deployments, replicaSets, dashThis));
        observer.complete();
      });

    });
    return observable;
  }

  createOverview(pods, services, deployments, replicaSets, dashThis): K8sOverview {
    // PODS
    let podsArr = dashThis.getPodsOverview(pods);

    // SERVICES
    let servicesArr = dashThis.getServicesOverview(services);

    // DEPLOYMENTS
    let deploymentsArr = dashThis.getDeploymentsOverview(deployments);

    // REPLICASETS
    let replicaSetsArr = dashThis.getReplicaSetsOverview(replicaSets);

    return <K8sOverview>{pods: podsArr, services: servicesArr, deployments: deploymentsArr, replicaSets: replicaSetsArr };
  }

  getPodsOverview(pods): PodView[] {
    let podsArr = [];
    let podItems = pods['items'];
    for (let key in podItems) {
      let namespace = podItems[key]['metadata']['namespace'];
      let name = "pod/"+podItems[key]['metadata']['name'];

      let status = podItems[key]['status']['phase'];

      let ready = 0;
      let restarts = 0;
      let phase = podItems[key]['status']['phase'];
      if(podItems[key]['status']['containerStatuses'] &&  phase.toString().toLocaleLowerCase() == 'running') {
        let cStatItems = podItems[key]['status']['containerStatuses'];
        console.log(cStatItems)
        let readyLen = cStatItems.length;
        for (let cstat in cStatItems) {
          if (cStatItems[cstat]['ready'] == true) {
            ready++;
          }
          restarts += cStatItems[cstat]['restartCount'];
        }
        let readyOut = "" + ready.toString() + "/" + readyLen;
        let age = podItems[key]['status']['startTime'];
        let durationHours = (((Date.now() - Date.parse(age)) / 1000) / 60 / 60).toFixed(2);
        age += " (" + durationHours + "h)";

        podsArr.push(<PodView>{
          namespace: namespace,
          name: name,
          ready: readyOut,
          status: status,
          restarts: restarts,
          age: age
        });
      }
    }

    return podsArr;
  }

  getServicesOverview(services): ServiceView[]{
    let servicesArr = [];
    let serviceItems = services['items'];
    for (let key in serviceItems) {
      let namespace = serviceItems[key]['metadata']['namespace'];
      let name = "service/"+serviceItems[key]['metadata']['name'];
      let type = serviceItems[key]['spec']['type'];
      let clusterIP = serviceItems[key]['spec']['clusterIP'];
      let sessionAffinity = serviceItems[key]['spec']['sessionAffinity'];
      let age = serviceItems[key]['metadata']['creationTimestamp'];
      let durationHours = (((Date.now() - Date.parse(age))/1000)/60/60).toFixed(2);
      age += " ("+durationHours+"h)";

      let portItems = serviceItems[key]['spec']['ports'];
      let ports = "";
      for (let p in portItems){
        ports += (ports.length>0?',':'')+portItems[p]['port']+'/'+portItems[p]['protocol'];
      }

      let ret = <ServiceView>{
        namespace: namespace,
        name: name,
        type: type,
        cluster_ip: clusterIP,
        external_ip: sessionAffinity,
        ports: ports,
        age: age
      };
      servicesArr.push(ret);
    }

    return servicesArr;
  }

  getDeploymentsOverview(deployments): DeploymentView[]{
    let deploymentsArr = [];
    let deploymentItems = deployments['items'];
    for (let key in deploymentItems) {
      let namespace = deploymentItems[key]['metadata']['namespace'];
      let name = "deployment.apps/"+deploymentItems[key]['metadata']['name'];
      let age = deploymentItems[key]['metadata']['creationTimestamp'];
      let durationHours = (((Date.now() - Date.parse(age))/1000)/60/60).toFixed(2);
      age += " ("+durationHours+"h)";

      let replicas = deploymentItems[key]['status']['replicas'];
      let updatedReplicas = deploymentItems[key]['status']['updatedReplicas'];
      let readyReplicas = deploymentItems[key]['status']['readyReplicas'];
      let availableReplicas = deploymentItems[key]['status']['availableReplicas'];

      let ready = readyReplicas+'/'+replicas

      let ret = <DeploymentView>{
        namespace: namespace,
        name: name,
        ready: ready,
        up_to_date: updatedReplicas,
        available: availableReplicas,
        age: age
      };
      deploymentsArr.push(ret);
    }

    return deploymentsArr;
  }

  getReplicaSetsOverview(deployments): ReplicaSetView[]{
    let replicasetsArr = [];
    let replicaSetItems = deployments['items'];
    for (let key in replicaSetItems) {
      let namespace = replicaSetItems[key]['metadata']['namespace'];
      let name = "deployment.apps/"+replicaSetItems[key]['metadata']['name'];
      let age = replicaSetItems[key]['metadata']['creationTimestamp'];
      let durationHours = (((Date.now() - Date.parse(age))/1000)/60/60).toFixed(2);
      age += " ("+durationHours+"h)";

      let replicas = replicaSetItems[key]['status']['replicas'];
      let fullyLabeledReplicas = replicaSetItems[key]['status']['fullyLabeledReplicas'];
      let readyReplicas = replicaSetItems[key]['status']['readyReplicas'];
      let availableReplicas = replicaSetItems[key]['status']['availableReplicas'];
      let observedGeneration = replicaSetItems[key]['status']['observedGeneration'];

      //let ready = readyReplicas+'/'+replicas

      let ret = <ReplicaSetView> {
        namespace: namespace,
        name: name,
        desired: replicas,
        current: availableReplicas,
        ready: readyReplicas,
        age: age
      };
      replicasetsArr.push(ret);
    }

    return replicasetsArr;
  }

  setAddonStatus(name: string, enabled: boolean): Observable<AddonStatus> {
    if (enabled) {
      return this.apiService.post('configure', {'addon': [{'name': name, 'enable': true}]}, null, 'text')
        .pipe(
          map((r: HttpResponse<Object>) => Object({status: r.status, logs: r.body}))
        );
    } else {
      return this.apiService.post('configure', {'addon': [{'name': name, 'disable': true}]}, null, 'text')
        .pipe(
          map((r: HttpResponse<Object>) => Object({status: r.status, logs: r.body}))
        );
    }
  }

  getMicroK8sStatus(): Observable<boolean> {
    return this.apiService.post('status', {})
      .pipe(
        map((r: HttpResponse<Object>) => r.body['microk8s']['running']),
        catchError((e) => {
          console.log(e);
          return of(false);
        })
      );
  }
}


