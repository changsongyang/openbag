资源下载地址：  
Linux Packages Search：https://pkgs.org/  
RPM resource ：rpmfind.net/linux/rpm2html/search.php?query=ncurses&submit=Search+...  
Docker：https://docs.docker.com/engine/installation/binaries/  

# 1. 首先内核版本  
## 	1.1 通过命令  uname -r  判断当前内核版本
		如果低于3.1 则需要升级内核
## 	1.2 如果低于3.1升级内核
	带aufs模块，记住一定要升级，要不然会出现很多莫名奇怪的问题，建议用yum安装
### 1.2.1 升级内核版本 
```c
rpm -ivh kernel-ml-aufs-3.10.5-3.el6.x86_64.rpm 
rpm -ivh kernel-ml-aufs-headers-3.10.5-3.el6.x86_64.rpm --nodeps --force
```
### 1.2.2 修改启动参数
```c
vi /etc/grub.conf
default=1 修改成 default=0 
//修改grub的主配置文件/etc/grub.conf，设置default=0，表示第一个title下的内容为默认启动的kernel（一般新安装的内核在第一个位置）
```

# 2. 确保系统支持容器，必须正确安装如下软件包。
```c
//lxc-checkconfig 用于判断linux内核是否支持LXC
lxc-checkconfig
	
rpm -ivh lxc-1.0.8-1.el6.x86_64.rpm --nodeps --force
rpm -ivh lxc-devel-1.0.8-1.el6.x86_64.rpm --nodeps --force
rpm -ivh lxc-templates-1.0.8-1.el6.x86_64.rpm --nodeps --force
```
# 3. 安装cgroup
> &nbsp;&nbsp;&nbsp;&nbsp;Cgroups是control groups的缩写，是Linux内核提供的一种可以限制、记录、隔离进程组（process groups）所使用的物理资源（如：cpu,memory,IO等等）的机制。最初由google的工程师提出，后来被整合进Linux内核。Cgroups也是LXC为实现虚拟化所使用的资源管理手段，可以说没有cgroups就没有LXC。   
> &nbsp;&nbsp;&nbsp;&nbsp;Cgroup是用于将一个或多个进程关联成“进程组”并统一进行的监控和管理的容器。根据监控或管理的需要，运行中的系统上很可能存在多个Cgroup，而这些Cgroup被组织成了层级结构（倒置的树状结构）。事实上，Cgroups是一种资源控制机制，其资源配置的最小单位是所谓的Subsystem――一种资源控制器，通过将资源划分为多种不同的类型（CPU、内存、磁盘输入输出等）并将这些类型的资源关联至层级结构中指定的Cgroup实现资源分配。

```c
rpm -ivh libcgroup-0.40.rc1-17.el6_7.x86_64.rpm --nodeps --force
rpm -ivh libcgroup-devel-0.40.rc1-17.el6_7.x86_64.rpm --nodeps --force
rpm -ivh libcgroup-pam-0.40.rc1-17.el6_7.x86_64.rpm --nodeps --force
```

# 4. 确保系统能否挂载cgroup。
```c
	vi /etc/fstab
//加入 
none                    /sys/fs/cgroup          cgroup  defaults        0 0
```
	
# 5. 查看文件最大打开数
```c
ulimit -n  
//如果小于65536，则需要修改成65536
//临时修改生效  
ulimit -SHn 65536
//永久修改生效 
vi /etc/security/limits.conf
//增加两行
* soft nofile 65536
* hard nofile 65536
```
# 6. 取消selinux，因为它会干扰lxc的正常功能。
```c
vi /etc/selinux/config 
将 selinux=enforce 修改成 selinux=disabled
将 selinuxtype 修改成 selinuxtype=targeted
```
# 7. 检测aufs是否存在。
```c
	grep aufs /proc/filesystems
```
# 8. 解压缩docker
```c
tar -xzvf docker-latest.tgz
mv docker/* /usr/bin/
//重启服务器
```
# 9. 启动docker
```c
dockerd &
//使用 docker ps 
docker cp Java1.7.75.zip 78e2d6742e91:/etc/
docker run -i -t centos6 /bin/bash
```