import { betterAuth } from "better-auth";
import { prisma } from "./prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account",
      // Aqui você pode interceptar o callback do Google:
      async onSignIn({ profile, user }: { profile: any; user: any }) {
        if (profile.picture && user && user.image !== profile.picture) {
          await prisma.user.update({
            where: { id: user.id },
            data: { image: profile.picture },
          });
        }
        return true;
      },
    },
  },
});
