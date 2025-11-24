import bcrypt from "bcrypt";

const password = "Minette123*";

async function run() {
  const hash = await bcrypt.hash(password, 10);
  console.log("Hash bcrypt généré :");
  console.log(hash);
}

run();
