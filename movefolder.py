import os
import shutil

# 要保留的文件夹列表
only_folders = [
    "Algorithm", "Bioinfo", "Data Analysis", "Program", "Web",
    "Database Management System", "Research", "Deep Learning", "Share",
    "Computer Organization", "Computer Network", "Operating System",
    "Computer Vision", "Machine Learning", "Theory Of Computation",
    "Compiler Construction", "Tools"
]

# 目标目录
target_dir = os.path.abspath("./docs/NOTE")  # 绝对路径转换
posts_dir = os.path.abspath("./docs/posts")  # 目标文件夹

# 确保目标 posts 目录存在
os.makedirs(posts_dir, exist_ok=True)

# **第一步**：先移动 `NOTE` 中的所有文件夹（不考虑 `only_folders`，直接移动）
if os.path.exists(target_dir):
    for item in os.listdir(target_dir):
        item_path = os.path.join(target_dir, item)

        if os.path.isdir(item_path):
            # 移动整个文件夹到 posts 目录
            shutil.move(item_path, posts_dir)
            print(f"Moved folder: {item_path}")

    # **第二步**：清理 `NOTE` 目录，只删除 `NOTE` 下的文件（不动文件夹）
    for item in os.listdir(target_dir):
        item_path = os.path.join(target_dir, item)

        if os.path.isfile(item_path):  # 只删除文件
            os.remove(item_path)
            print(f"Deleted file: {item_path}")

    print("Cleanup completed.")
else:
    print(f"Directory does not exist: {target_dir}")