# GDB 靜態互動簡報

開啟 `index.html` 即可瀏覽，無需安裝套件。亦可在此資料夾執行 `python3 -m http.server 8000`，再開啟 http://localhost:8000。

- 共 9 頁；桌面以方向鍵、Home、End 或章節導覽切換。
- 小於 960px 寬或 540px 高，預設改為自然捲動；右上方可切換模式。
- 修改內容：`index.html`；視覺樣式：`styles.css`；換頁行為：`app.js`。
- 客戶與通路圖片分別位於 `clients-logo/`、`channels-logo/`，保留來源原檔。
- 字型使用 Arial 與中文系統備援，若系統已安裝 Noto Sans TC 則優先使用；不依賴遠端字型服務。
- 瀏覽器列印採橫向，每張簡報依紙張可用寬高等比例調整大小，不使用固定縮放百分比。列印對話框保持 100%（避免再次縮放），建議邊界選「無」、啟用背景圖形、關閉頁首頁尾。紙張若不是 16:9，會保留空白以確保內容完整。網站無法替使用者操作瀏覽器原生的「配合紙張調整大小」選項。

## GitHub Pages 自動發佈

工作流程位於 `.github/workflows/deploy-pages.yml`，推送至 `main` 時自動發佈，也可以手動執行。此專案是純靜態網站，不需 npm 安裝或建置。

### 首次啟用

1. 將專案（包含 `.github/workflows/deploy-pages.yml`）提交並推送至 GitHub 儲存庫的 `main` 分支。
2. 在 GitHub 儲存庫開啟 **Settings → Pages → Build and deployment**，將 **Source** 設為 **GitHub Actions**。
3. 開啟 **Actions → Deploy GDB website to GitHub Pages → Run workflow**，選擇 `main` 並執行。如果初次推送因尚未啟用 Pages 而失敗，完成設定後重新執行即可。
4. 成功後，可從工作流程的 `github-pages` 部署連結或 **Settings → Pages** 開啟網站。

後續只要提交並推送至 `main`，網站就會自動更新。工作流程使用 GitHub 自動提供的權限，不需要額外設定個人存取權杖或 Secrets。若儲存庫或組織限制 Actions，須允許此工作流程使用的 GitHub 官方 actions。

### 發佈內容

工作流程只打包 `index.html`、`styles.css`、`app.js`，以及兩個 Logo 資料夾中的 PNG／JPG 圖片；設計文件、README 與 Git 管理檔案不會放入網站發佈產物。日後新增其他網站資源時，請同步更新工作流程的複製清單。

網站使用相對路徑，支援 `https://帳號.github.io/儲存庫名稱/` 形式的專案網址。若改用其他分支發佈，需同步修改工作流程的 `on.push.branches` 與 `jobs.deploy.if`。

官方說明：[使用 GitHub Pages 自訂工作流程](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
