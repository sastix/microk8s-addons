import gql from 'graphql-tag';

export const GetAddOns = gql`
  query {
    getAddons {
      name
      enabled
    }
  }
`;

export const GetServiceInfo = gql`
  query {
    getServiceInfo {
      name
      mode
      status
    }
  }
`;

export const SetAddonStatus = gql`
  mutation setAddonStatus($name: String!, $enabled: Boolean!) {
    setAddonStatus(name: $name, enabled: $enabled) {
      name
      enabled
    }
  }
`;

export const GetMicroK8sPower = gql`
  query {
    getPower {
      running
    }
  }
`;

export const SetMicroK8sPower = gql`
  mutation setPower($enabled: Boolean!) {
    setPower(enabled: $enabled) {
      running
    }
  }
`;

export const RestartService = gql`
  mutation restartService($name: String!) {
    restartService(name: $name) {
      name
      mode
      status
    }
  }
`;

export const SetServiceMode = gql`
  mutation setServiceMode($name: String!, $enabled: Boolean!) {
    setServiceMode(name: $name, enabled: $enabled) {
      name
      mode
      status
    }
  }
`;

export const SetServiceStatus = gql`
  mutation setServiceStatus($name: String!, $enabled: Boolean!) {
    setServiceStatus(name: $name, enabled: $enabled) {
      name
      mode
      status
    }
  }
`;

