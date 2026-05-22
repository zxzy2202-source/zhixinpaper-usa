module.exports = {
  apps: [
    {
      name: "zhixinpaper-usa",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "/home/ubuntu/zhixinpaper-usa",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
