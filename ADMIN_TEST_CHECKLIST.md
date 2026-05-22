# 后台亲测清单（zhixinpaper-usa）

> 老板，按顺序跑下面这 6 关。任一关报错，把**红色错误**截图或文字贴回来即可。

---

## 准备：开终端到工程根目录

```bash
cd E:\website\zhixinpaper-usa-main
```

---

## 第 1 关：刷新数据库（新增了 `image_slots` 表）

```bash
npm run db:init
```

✅ 预期输出最后一行：`Database initialized successfully.`  
（如果看到 `image_slots` 已存在不算错。）

---

## 第 2 关：创建超级管理员

```bash
npm run admin:create
```

按提示输入：
- 邮箱（例如 `boss@zhixinpaper.com`）
- 姓名（例如 `老板`）
- 密码（**至少 8 位**，越复杂越好；这是登录密码，要记住）

✅ 预期输出：`✓ Admin user created` 或 `✓ Admin user updated`

> 也可以一行命令搞定（跳过交互）：
> ```bash
> set ADMIN_EMAIL=boss@zhixinpaper.com && set ADMIN_NAME=老板 && set ADMIN_PASSWORD=换成你的密码 && npm run admin:create
> ```

---

## 第 3 关：启动开发服务器

```bash
npm run dev
```

✅ 预期看到 `Local: http://localhost:3000`，进程一直挂着别 Ctrl+C。

---

## 第 4 关：登录后台

浏览器打开 → http://localhost:3000/admin/login

用刚创建的邮箱 + 密码登录。

✅ 预期：跳到 `/admin` 仪表盘，左侧能看到这些菜单：
- 概览 / 仪表盘
- 线索与询盘（联系询盘、报价请求、样品申请）
- 内容管理（博客文章、产品管理、**图片管理**、**图片槽位** ← 新加的）
- 系统 / 系统设置

❌ 如果点登录后停在原页面或报 500：检查 `.env.local` 里 `ADMIN_SESSION_SECRET` 是否存在；检查浏览器 Console / Network 标签的具体报错。

---

## 第 5 关：上传图片（验证 ⚡ 浏览器压缩）

1. 点左侧菜单 → **图片管理** → 进入 `/admin/media`
2. 点"上传图片"按钮，选一张**大图**（>2MB 最明显）
3. 上传过程中应该看到图片缩略图上**短暂出现紫色 ⚡ 遮罩**（这是浏览器端预压缩在跑）
4. 上传完成后，文件名右下方应该有**双色压缩比**（例如：`原 3.2MB → 压缩后 480KB，节省 85%`）

✅ 预期：上传成功，列表里能看到这张图。

❌ 如果上传卡死或 500：F12 → Network 找 `POST /api/admin/media` 看 Response。最常见原因是 `.env.local` 里 `BLOB_READ_WRITE_TOKEN` 没配（Vercel Blob 上传 token）。

---

## 第 6 关：测试图片槽位（核心新功能）

1. 点左侧菜单 → **图片槽位** → 进入 `/admin/image-slots`
2. 应该看到分组卡片：**首页 / 关于我们 / 工厂 / 地区落地页**，总共约 10 个槽位
3. 找 "首页主视觉 Hero" 这一项，点右下 **"绑定"** 按钮
4. 弹窗里选择刚上传的图片
5. 卡片左上角徽章从黄色 `fallback` 变成绿色 `已绑定` → 成功
6. 新开标签页打开 http://localhost:3000/  → 首页 Hero 区域应该是你刚绑定的图

> 此时槽位组件还没有接入前台页面（下一步要做的事），所以 **第 6 步前台不换图属正常**。  
> 后台显示绑定成功就算这一关过。

✅ 预期：后台 `已绑定` 徽章正确显示；解绑按钮（链断图标）点一下变回 `fallback` 状态。

❌ 如果"绑定"后立刻报错：F12 → Network 找 `PUT /api/admin/image-slots` 看 Response。

---

## 第 7 关（可选）：测询盘流程

1. 新开标签页 → http://localhost:3000/contact
2. 随便填一个表单提交
3. **微信应该秒收 Server酱推送**（来自老板已配的 SCT352894TA-...）
4. 回后台 → 联系询盘 → 看到刚提交的那条

---

## 📋 反馈格式

跑完上面 6 关后，老板告诉我：
- 哪几关过了（写 ✅）
- 哪几关报错（写 ❌ + 把错误截图或文字粘过来）

我立即修。

---

## 🚧 已知未完成的事（下一步要做）

- [ ] 把前台 `<Image src="/images/xxx.jpg">` 替换成 `<SlotImage slotKey="...">`，让后台绑定的图真正显示到前台（首页 5 处 + about/factory 2 处 + geo 3 处）
- [ ] 3 个未决问题：data.ts 公司地址/电话是否真实、有多少真实工厂图、本仓将来用什么域名

这些都不影响这次的亲测。
