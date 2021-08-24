export const config = () => ({ 
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ["src/**/**.entity{.ts,.js}", "dist/**/*.entity{.ts,.js}"],
    synchronize: true
  },
  mail: {
    transport: {
      type: process.env.MAIL_TYPE, 
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    },
    defaults: {
      forceEmbeddedImages: true,
      from: '"No Reply" <noreply@example.com>',
    },
    template: {
      dir: './src/mail/templates',
      options: {
        strict: true,
      },
    }
  }
});
