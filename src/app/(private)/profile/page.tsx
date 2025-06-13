import { Role, User } from "@/types/model/User";
import { ManageProfile } from "./_components/manageProfile/ManagerProfile";

export default function Profile() {
  // Exemplo de dados fake completos para o usuário
  const fakeUser: Partial<User> = {
    id: "123",
    name: "João Silva",
    email: "joao.silva@email.com",
    role: Role.EDITOR,
    image: "https://github.com/shadcn.png",
  };

  return <ManageProfile initialUser={fakeUser} />;
}
