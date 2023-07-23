
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function wait(second) {
  let waitPromise = new Promise((resolver, rejector) => {
    setTimeout(() => {
      resolver();
    }, second * 1000);
  });
  return waitPromise;
}

async function getName() {
  let nameGet;
  console.log("Lấy tên chủ nhân chiếc bánh");
  await new Promise((resolve, reject) => {
    rl.on("line", (input) => {
      nameGet = input;
      resolve();
    });
  });
  return nameGet;
}

async function getAge() {
  let ageGet;
  console.log("Lấy tuổi chủ nhân chiếc bánh");
  await new Promise((resolve, reject) => {
    rl.on("line", (input) => {
      ageGet = parseInt(input);   
      resolve();
    });
  });
  return ageGet;
}

async function getCakeSize() {

  let sizeGet;
  let moneyExpect;
  console.log("Lấy size bánh (S, M, L)");
  await new Promise((resolve, reject) => {
    rl.on("line", (input) => {
      sizeGet = input;
      resolve();
    });
  });
  if(sizeGet == "S"){
    moneyExpect = 169000;
  }else if(sizeGet == "M"){
    moneyExpect = 233000;
  }else{
    moneyExpect = 510000;
  }
  return moneyExpect;
}

async function getMoney(moneyExpect) {
  let moneyGet;
  return new Promise(async (resolve, reject) => {
    console.log("Xin tiền mẹ thôi ::>>");
    await new Promise((resolve, reject) => {
      rl.on("line", (input) => {
        moneyGet = parseInt(input);
        resolve();
        rl.close();
      });
    });
    console.log(`Tiền mẹ cho: ${moneyGet}`);
    console.log(`Tiền mình cần: ${moneyExpect}`);
    if (moneyGet >= moneyExpect) {
      resolve("Ok có tiền rồi");
      if(moneyExpect < moneyGet){
        console.log(`Số tiền thừa trả lại cho mẹ: ${(moneyGet - moneyExpect)}`);
      }
    } else {
      reject();
    }
  });
}

async function goToMarket() {
  console.log("Đi mua nguyên liệu");
  await wait(4);
  console.log("Bắt đầu về");
  await wait(2);
  console.log("Về đến nhà rồi");
}

async function cook() {
  async function soChe() {
    return new Promise(async (res, rej) => {
      console.log("Sơ chế nguyên liệu\n==================");
      console.log("\n1.Tách trứng");
      console.log("2.Ray bột");
      console.log("3.Chuẩn bị gia vị");
      await wait(5);
      console.log("sơ chế hoàn thành");
      res();
    });
  }
  async function cake() {
    return new Promise(async (resolve, reject) => {
      console.log("Làm bột bánh");
      await wait(3);
      console.log("Bột bánh đã xong");
      resolve();
    });
  }
  async function Cream() {
    return new Promise(async (resolve, reject) => {
      console.log("Đánh kem");
      await wait(4);
      console.log("Đánh kem xong");
      resolve();
    });
  }
  await soChe();
  await Promise.all([cake(), Cream()]);
}


async function riseNBake() {
  console.log("Ủ bánh");
  await wait(2);
  console.log("Bánh đã ủ xong");
  console.log("Đổ khuôn");
  await wait(1);
  console.log("Xong ròi, bây giờ nướng bánh thoiiii");
  await wait(3);
  console.log("All done!!");
}

async function deco(){
  console.log("Quết kem lên bánh");
  await wait(1);
  console.log("Đã quết kem xong");
  async function trangTri(){
    return new Promise( async (resolve, reject) => {
      console.log("Trang trí bánh");
      await wait(1.5);
      console.log("Trang trí xong");
      resolve();
    });
  }

  async function vietTen(){
    return new Promise( async (resolve, reject) => {
      console.log("Viết tên lên bánh");
      await wait(1);
      console.log("Viết tên xong");
      resolve();
    });
  }
  await Promise.all([trangTri(), vietTen()]);
  console.log("Bây giờ thì khoe mẹ ::>");
  await wait(0.5);
  console.log("Quất!!!!!!!");
}

let main = async function () {
  let cakeName = await getName();
  let age = await getAge();
  let expectMoney = await getCakeSize();
  console.log(expectMoney);
  await getMoney(expectMoney)
    .then(async (value) => {
      console.log(value);
      await goToMarket();
      await cook();
      await riseNBake();
      await deco();
    })
    .catch((value) => {
      console.log(value);
      console.log("Không đủ tiền làm bánh. Mission failed");
    });
};

main();
