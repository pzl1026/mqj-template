import goods from './goods';
import order from './order';
import account from './account';

function moduleAddAccount (modules, ac) {
  for (let r in modules) {
    modules[r] = [
      ...modules[r],
      ...ac
    ];
  }
  return modules;
}

const routes = {
  goods,
  order
};

const r = moduleAddAccount(routes, account);

export default r;