# CentOS 7 中 Docker 的安装
Docker 软件包已经包括在默认的 CentOS-Extras 软件源里。因此想要安装 docker，只需要运行下面的 yum 命令：
## 设定yum
```c
[root@localhost ~]# cat > /etc/yum.repos.d/docker.repo <<-EOF
> [dockerrepo]
> name=Docker Repository
> baseurl=https://yum.dockerproject.org/repo/experimental/centos/7/
> enabled=1
> gpgcheck=1
> gpgkey=https://yum.dockerproject.org/gpg
> EOF

```
## 确认旧的docker相关的组件并删除
你的机器上一定有用centos简易安装方式yum install docker安装的各种docker组件。安装1.12之前先把它们删掉吧，不然后面有可能还是会提示你删除的。
```c
[root@host32 ~]# rpm -qa |grep docker
docker-selinux-1.10.3-44.el7.centos.x86_64
docker-common-1.10.3-44.el7.centos.x86_64
docker-forward-journald-1.10.3-44.el7.centos.x86_64
docker-1.10.3-44.el7.centos.x86_64
[root@host32 ~]#
[root@host32 ~]# yum -y remove docker-selinux-1.10.3-44.el7.centos.x86_64
[root@host32 ~]# yum -y remove docker-common-1.10.3-44.el7.centos.x86_64
[root@host32 ~]# yum -y remove docker-forward-journald-1.10.3-44.el7.centos.x86_64
[root@host32 ~]# yum -y remove docker-1.10.3-44.el7.centos.x86_64
```
## 安装docker-engine

```c
[root@localhost ~]# yum install -y docker-engine

```
# 启动 Docker 服务
安装完成后，使用下面的命令来启动 docker 服务，并将其设置为开机启动：
```c
[root@localhost ~]# service docker start
[root@localhost ~]# chkconfig docker on
```
LCTT 译注：此处采用了旧式的 sysv 语法，如采用CentOS 7中支持的新式 systemd 语法，如下
```c
[root@localhost ~]# systemctl  start docker.service
[root@localhost ~]# systemctl  enable docker.service
```
# 安装过程控制台输出
```c
[root@localhost ~]# yum install -y docker-engine
Loaded plugins: fastestmirror, langpacks
dockerrepo                                                                                                           | 2.9 kB  00:00:00     
dockerrepo/primary_db                                                                                                |  53 kB  00:00:02     
Loading mirror speeds from cached hostfile
 * base: mirrors.zju.edu.cn
 * extras: mirrors.zju.edu.cn
 * updates: mirrors.zju.edu.cn
Resolving Dependencies
--> Running transaction check
---> Package docker-engine.x86_64 0:1.12.1-1.el7.centos will be installed
--> Processing Dependency: docker-engine-selinux >= 1.12.1-1.el7.centos for package: docker-engine-1.12.1-1.el7.centos.x86_64
--> Running transaction check
---> Package docker-engine-selinux.noarch 0:1.12.1-1.el7.centos will be installed
--> Finished Dependency Resolution

Dependencies Resolved

============================================================================================================================================
 Package                                 Arch                     Version                                Repository                    Size
============================================================================================================================================
Installing:
 docker-engine                           x86_64                   1.12.1-1.el7.centos                    dockerrepo                    19 M
Installing for dependencies:
 docker-engine-selinux                   noarch                   1.12.1-1.el7.centos                    dockerrepo                    28 k

Transaction Summary
============================================================================================================================================
Install  1 Package (+1 Dependent package)

Total download size: 19 M
Installed size: 80 M
Downloading packages:
warning: /var/cache/yum/x86_64/7/dockerrepo/packages/docker-engine-selinux-1.12.1-1.el7.centos.noarch.rpm: Header V4 RSA/SHA512 Signature, key ID 2c52609d: NOKEY
Public key for docker-engine-selinux-1.12.1-1.el7.centos.noarch.rpm is not installed
(1/2): docker-engine-selinux-1.12.1-1.el7.centos.noarch.rpm                                                          |  28 kB  00:00:03     
(2/2): docker-engine-1.12.1-1.el7.centos.x86_64.rpm          63% [===============================-                  ]  48 kB/s |  12 MB  00:(2/2): docker-engine-1.12.1-1.el7.centos.x86_64.rpm          63% [===============================-                  ]  44 kB/s |  12 MB  00:(2/2): docker-engine-1.12.1-1.el7.centos.x86_64.rpm                                                                  |  19 MB  00:08:16     
--------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                        39 kB/s |  19 MB  00:08:16     
Retrieving key from https://yum.dockerproject.org/gpg
Importing GPG key 0x2C52609D:
 Userid     : "Docker Release Tool (releasedocker) <docker@docker.com>"
 Fingerprint: 5811 8e89 f3a9 1289 7c07 0adb f762 2157 2c52 609d
 From       : https://yum.dockerproject.org/gpg
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : docker-engine-selinux-1.12.1-1.el7.centos.noarch                                                                         1/2 
restorecon:  lstat(/var/lib/docker) failed:  No such file or directory
warning: %post(docker-engine-selinux-1.12.1-1.el7.centos.noarch) scriptlet failed, exit status 255
Non-fatal POSTIN scriptlet failure in rpm package docker-engine-selinux-1.12.1-1.el7.centos.noarch
  Installing : docker-engine-1.12.1-1.el7.centos.x86_64                                                                                 2/2 
  Verifying  : docker-engine-selinux-1.12.1-1.el7.centos.noarch                                                                         1/2 
  Verifying  : docker-engine-1.12.1-1.el7.centos.x86_64                                                                                 2/2 

Installed:
  docker-engine.x86_64 0:1.12.1-1.el7.centos                                                                                                

Dependency Installed:
  docker-engine-selinux.noarch 0:1.12.1-1.el7.centos                                                                                        

Complete!
[root@localhost ~]# 

```