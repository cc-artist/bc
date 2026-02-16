import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// 确保NEXTAUTH_SECRET存在，否则生成一个默认值（仅用于开发环境）
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'default-secret-for-development-only';

// 这里我们使用简单的密码认证，实际项目中应该从数据库获取管理员信息
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// 定义认证选项
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'admin@example.com'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '********'
        }
      },
      async authorize(credentials) {
        // 简单的密码验证，实际项目中应该使用数据库查询和密码哈希验证
        if (
          credentials?.email === ADMIN_EMAIL &&
          credentials?.password === ADMIN_PASSWORD
        ) {
          return {
            id: '1',
            email: ADMIN_EMAIL,
            name: 'Admin User'
          };
        }
        
        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        // 使用类型断言扩展session.user类型
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
  secret: NEXTAUTH_SECRET,
};

// 导出NextAuth处理函数
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };