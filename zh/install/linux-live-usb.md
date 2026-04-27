# Linux Live USB(开源版)

完整教程见 [快速开始 → Linux Live USB](/zh/quickstart/linux-live-usb)。

## 一句话流程

1. Windows PowerShell 跑 `1-prepare-usb.ps1` → `2-download-iso.ps1` → `3-create-persistence.ps1` → `4-copy-to-usb.ps1`
2. 拔出 U 盘,从 USB 启动目标电脑,选 Ubuntu ISO
3. 进入 Ubuntu 桌面,跑 `sudo bash /media/*/Ventoy/u-hermes-linux/setup-hermes.sh`
4. 之后每次双击桌面 U-Hermes 图标就能开

## 文件来源

所有制盘脚本都在 `dongsheng123132/u-hermes` 仓库的 `linux/` 目录:

```bash
git clone https://github.com/dongsheng123132/u-hermes.git
cd u-hermes/linux
```

## 详细参考

→ [Linux Live USB 完整教程](/zh/quickstart/linux-live-usb)
