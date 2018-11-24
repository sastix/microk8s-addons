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
