import {environment} from '../environments/environment';
import {NgxsModuleOptions} from '@ngxs/store';

export const ngxsConfig: NgxsModuleOptions = {
  developmentMode: !environment.production,
  selectorOptions: {
    // These Selector Settings are recommended in preparation for NGXS v4
    // (See above for their effects)
    suppressErrors: false,
    injectContainerState: false
  },
  // Execution strategy overridden for illustrative purposes
  // (only do this if you know what you are doing)
  // executionStrategy: NoopNgxsExecutionStrategy  // To be used with OnPush strategy
};
