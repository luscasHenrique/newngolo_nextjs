// src/app/(account)/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, ShoppingCart, User } from "lucide-react";

// Como esta é uma página, ela pode ser um Server Component por padrão.
export default function AccountPage() {
  return (
    // Usamos 'space-y-6' para dar um espaçamento vertical entre os elementos
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Minha Conta</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações, agendamentos e compras.
        </p>
      </div>

      {/* Componente de Abas (Tabs) */}
      <Tabs defaultValue="agenda" className="w-full">
        {/* Lista de botões que acionam as abas */}
        <TabsList className="grid w-full grid-cols-3 md:w-fit">
          <TabsTrigger value="agenda">
            <CalendarDays className="mr-2 h-4 w-4" />
            Agenda
          </TabsTrigger>
          <TabsTrigger value="perfil">
            <User className="mr-2 h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="carrinho">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Carrinho
          </TabsTrigger>
        </TabsList>

        {/* Conteúdo de cada aba */}

        {/* Conteúdo da Aba "Agenda" */}
        <TabsContent value="agenda">
          <Card>
            <CardHeader>
              <CardTitle>Seus Agendamentos</CardTitle>
              <CardDescription>
                Aqui estão suas aulas e compromissos futuros.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Exemplo de conteúdo de agendamento (pode ser substituído por dados reais) */}
              <div className="text-center text-muted-foreground py-8">
                <p>Parece que sua agenda está vazia.</p>
                <p className="text-sm">
                  Agende sua próxima aula ou compromisso.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conteúdo da Aba "Perfil" */}
        <TabsContent value="perfil">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Conta</CardTitle>
              <CardDescription>
                Atualize seus dados pessoais e informações de contato.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Formulário de perfil viria aqui */}
              <p className="text-muted-foreground py-8 text-center">
                Formulário de edição de perfil em breve...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conteúdo da Aba "Carrinho" */}
        <TabsContent value="carrinho">
          <Card>
            <CardHeader>
              <CardTitle>Carrinho de Compras</CardTitle>
              <CardDescription>
                Finalize a compra dos seus produtos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Conteúdo do carrinho viria aqui */}
              <div className="text-center text-muted-foreground py-8">
                <p>Seu carrinho está vazio.</p>
                <p className="text-sm">É hora de adicionar novos produtos!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
