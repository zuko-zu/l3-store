import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { userService } from "./services/user.service";

async function processUserService() {
  await userService.init();
}

processUserService()
  .then(() => {
    const router = new Router();

    router.route();
    cartService.get();
  })

setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250);
