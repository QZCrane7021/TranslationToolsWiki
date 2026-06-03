# 安装

## 本体安装

### Windows 非 LTSC 版本

Windows 的非 LTSC 版本中集成了 `winget` 工具。在以往，`yt-dlp` 这类工具软件安装相当麻烦，但 `winget` 可以自动添加 `PATH` 变量，省去了许多步骤。

按下 ++windows+r++ ，在弹出的窗口中输入 powershell，按下回车，打开 Powershell 窗口，输入指令：

```powershell
winget install yt-dlp
```

### Windows LTSC 版本

使用 Windows LTSC 版本，则默认你掌握了手动下载、添加 PATH 等操作，但这意味着你还同时需要手动安装其他依赖，还是强烈建议补上一个 winget。

以管理员身份打开 Powershell，输入以下指令：

```powershell
irm asheroto.com/winget | iex
```

执行完成后重启 Powershell，即可像之前的 Windows 非 LTSC 版本那样安装 yt-dlp。

### 类 UNIX 系统

macOS 和 Linux 等类 UNIX 系统支持用以下指令安装 yt-dlp：

```shell
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o ~/.local/bin/yt-dlp
chmod a+rx ~/.local/bin/yt-dlp  # 给下载的程序赋予执行权限
```

也可以用非内置的包管理器 Homebrew 安装：

```shell
brew install yt-dlp
```

!!! warning "`sudo apt install` 的陷阱"
    在 Linux 上，必须先执行以下指令：

    ```shell
    sudo add-apt-repository ppa:tomtomtom/yt-dlp 
    sudo apt update
    ```

    才能安装 `yt-dlp`，否则安装到的版本为 2024 版，不适用于目前的 Youtube！

## deno 安装

`yt-dlp` 默认使用的 `deno` 作为 JavaScript 运行时。缺少 JavaScript 运行时可能导致 `yt-dlp` 无法拉取到高清晰度的视频信息。虽然也可以指定其他设备上已有的运行时，但有时支持不如 `deno`。

不过，有些安装渠道会一并自动安装 `deno`。打开任意的命令行窗口，输入 `deno --version`，检查是否有这样的版本信息提示：

```
deno 2.7.14 (stable, release, aarch64-apple-darwin)
v8 14.7.173.20-rusty
typescript 5.9.2
```

如果出现这样的信息，则可以跳过此步。

=== ":fontawesome-brands-windows: Windows"

    打开 Powershell，输入指令后执行：

    ```powershell
    irm https://deno.land/install.ps1 | iex
    ```

=== ":fontawesome-brands-apple: macOS 和 :fontawesome-brands-linux: Linux"

    打开终端，输入指令后执行：

    ```bash
    curl -fsSL https://deno.land/install.sh | sh
    ```