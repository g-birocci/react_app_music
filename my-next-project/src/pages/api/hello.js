// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}

export async function dadosHistory() {
  const response = await fetch("/data/history.json");
  if(!response.ok) {
    throw new error("Erro ao carregar os dados")
  }
  return response.json;  
}

