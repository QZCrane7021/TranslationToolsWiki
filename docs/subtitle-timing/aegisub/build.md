# 从源代码编译 Aegisub

如果你执意要使用 Linux 运行 Aegisub，那你可能需要从源代码编译程序。Linux 端 UI 清晰，输入法也没有问题，但有一些其他的 BUG。如果现在离你入睡的时间**很近了**，那么**不建议今天编译程序。**

## 下载源代码

经实测，3.4.2 版本的 Aegisub 源代码编译可以运行在 Linux Mint Cinnamon 最新版上，也就是可认为兼容 Ubuntu。Fedora、Arch Linux、Redhat 等等版本未经测试。

点击 [这里][aegisub-source-code] 下载 Aegisub 的 3.4.2 版本源代码。

[aegisub-source-code]:https://github.com/TypesettingTools/Aegisub/archive/refs/tags/v3.4.2.tar.gz

## 编译前准备

首先，更新软件源列表：

```shell
sudo apt update
```

接着，安装以下依赖：

```shell
sudo apt install build-essential pkg-config meson ninja-build gettext intltool libfontconfig1-dev libass-dev libboost-chrono-dev libboost-locale-dev libboost-regex-dev libboost-system-dev libboost-thread-dev zlib1g-dev wx3.2-headers libwxgtk3.2-dev icu-devtools libicu-dev libpulse-dev libasound2-dev libopenal-dev libffms2-dev libfftw3-dev libhunspell-dev libuchardet-dev libcurl4-gnutls-dev libgl1-mesa-dev libgtest-dev libgmock-dev libportal-gtk3-dev
```

然后构建编译环境：

```shell
meson setup build --prefix=/usr/local --buildtype=release --strip -Dsystem_luajit=false -Ddefault_library=static
```

但是，编译时需要版本信息，而从 Release 下载的源代码没有 .git 文件夹，所以需要手动 “伪造” 一套：

```shell
sudo apt install git
git init

git config user.name "builder"
git config user.email "builder@example.com"

git add .
git commit -m "local build"

git tag v3.4.2
```

## 编译与运行

```shell
meson compile -C build
sudo meson install -C build --skip-subprojects luajit
```

如此，Aegisub 就会直接安装到系统中。不过这样似乎无法出现在应用列表 UI 中，需要输入 `aegisub` 指令执行打开。