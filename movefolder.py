import os
import shutil

# 要保留的文件夹列表
only_folders = [
    "Algorithm",
    "Bioinfo",
    "Data Analysis",
    "Program",
    "Web",
    "Database Management System",
    "Research",
    "Deep Learning",
    "Share",
    "Computer Organization",
    "Computer Network",
    # "Math",
    # "Contest",
    "Operating System",
    "Tools",
    "Computer Vision",
    "Machine Learning",
    "Theory Of Computation",
    "Compiler Construction",
]

# 目标目录（修改为你的路径）
target_dir = "./docs/NOTE"  # 替换为实际的目标目录路径

def clean_directory(directory, allowed_folders):
    # 遍历目录中的所有内容
    for item in os.listdir(directory):
        item_path = os.path.join(directory, item)

        # 如果是文件夹
        if os.path.isdir(item_path):
            if item not in allowed_folders:
                # 删除不在保留列表中的文件夹
                shutil.rmtree(item_path)
                print(f"Deleted folder: {item_path}")
        # 如果是文件
        elif os.path.isfile(item_path):
            # 删除所有单个文件
            os.remove(item_path)
            print(f"Deleted file: {item_path}")

# 执行清理操作
if __name__ == "__main__":
    target_dir = os.path.abspath(target_dir)  # 转为绝对路径
    if os.path.exists(target_dir):
        clean_directory(target_dir, only_folders)
        print("Cleanup completed.")
    else:
        print(f"Directory does not exist: {target_dir}")
    # move all folders from NOTE to posts folder, don't use only_folders
    for item in os.listdir(target_dir):
        item_path = os.path.join(target_dir, item)
        if os.path.isdir(item_path):
            shutil.move(item_path, "./docs/posts")
            print(f"Moved folder: {item_path}")
