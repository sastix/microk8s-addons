import {Component, Input, OnInit} from '@angular/core';
import {Addon} from '@common/graphql.schema';
import {DashboardService} from '../dashboard.service';
import {MatSlideToggleChange} from '@angular/material';

export interface AddOnModel extends Addon {
  info: string;
}


@Component({
  selector: 'app-add-on',
  templateUrl: './add-on.component.html'
})
export class AddOnComponent implements OnInit {

  @Input() addOn: AddOnModel;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.setAddonInfo(this.addOn);
  }

  onToggleChange(event: MatSlideToggleChange, addOn: Addon): void {
    this.dashboardService.setAddonStatus(addOn.name, event.checked)
      .subscribe(value => {
        this.addOn = value as AddOnModel;
        this.setAddonInfo(this.addOn);
      });

  }

  setAddonInfo(addOn: AddOnModel): void {
    switch (addOn.name) {
      case 'gpu':
        addOn.info = 'Expose GPU(s) to MicroK8s by enabling the nvidia-docker runtime and ' +
          'nvidia-device-plugin-daemonset. Requires NVIDIA drivers to already be installed on the host system.';
        break;
      case 'istio':
        addOn.info = 'Deploy the core <a href="https://istio.io/" target="_blank">Istio</a> services. You can use the ' +
          '<strong>microk8s.istioctl</strong> command to manage your deployments.';
        break;
      case 'dns':
        addOn.info = 'Deploy kube dns. This addon may be required by others thus we recommend you always enable it.';
        break;
      case 'dashboard':
        addOn.info = 'Deploy kubernetes dashboard as well as grafana and influxdb. To access grafana point your ' +
          'browser to the url reported by <strong>microk8s.kubectl cluster-info</strong>.';
        break;
      case 'storage':
        addOn.info = 'Create a default storage class. This storage class makes use of the hostpath-provisioner pointing ' +
          'to a directory on the host. Persistent volumes are created under <strong>${SNAP_COMMON}/default-storage</strong>. ' +
          'Upon disabling this addon you will be asked if you want to delete the persistent volumes created.';
        break;
      case 'ingress':
        addOn.info = 'Create an ingress controller.';
        break;
      case 'registry':
        addOn.info = 'Deploy a docker private registry and expose it on <strong>localhost:32000</strong>. The storage addon will be ' +
          'enabled as part of this addon. To ' +
          '<a href="https://github.com/ubuntu/microk8s/blob/master/docs/registry.md" target="_blank">use the registry</a> ' +
          'you can use the <strong>microk8s.docker</strong> command.';
        break;
      case 'metrics-server':
        addOn.info = 'Deploy the <a href="https://kubernetes.io/docs/tasks/debug-application-cluster/core-metrics-pipeline/#metrics-server" target="_blank">' +
          'Metrics Server</a>.';
        break;
    }
  }
}
