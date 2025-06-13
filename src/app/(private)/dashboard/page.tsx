import { ButtonSignOut } from "./_components/button-signout";

export default async function Dashboard() {
  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold mb-2">Página dashboard</h1>
      <h3>Usuario logado:</h3>
      <h3 className="mb-2">Email: </h3>
      <ButtonSignOut />
    </div>
  );
}
