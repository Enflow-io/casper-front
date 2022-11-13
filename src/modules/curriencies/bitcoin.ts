import { store } from '../../store/store';
import { BaseCurrency } from './baseCurrency';
import { getCourse } from '../../store/slices/course/asyncThunks/getCourse';

class Bitcoin extends BaseCurrency {
  getCourse(): void {
    store.dispatch(
      // @ts-ignore
      getCourse('bitcoin'),
    );
  }

  validate(): void {
  }
}

export { Bitcoin };
