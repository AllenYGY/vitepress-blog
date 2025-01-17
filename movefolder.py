import os
import shutil

# 要保留的文件夹列表
only_folders = {
    "Algorithm", "Bioinfo", "Data Analysis", "Program", "Web",
    "Database Management System", "Research", "Deep Learning", "Share",
    "Computer Organization", "Computer Network", "Operating System",
    "Computer Vision", "Machine Learning", "Theory Of Computation",
    "Compiler Construction", "Tools"
}

# 目标目录
target_dir = os.path.abspath("./docs/NOTE")  # 源目录
posts_dir = os.path.abspath("./docs/posts")  # 目标目录

# 确保目标 posts 目录存在
os.makedirs(posts_dir, exist_ok=True)

# **第一步**: 遍历 `NOTE` 目录，处理文件和文件夹
if os.path.exists(target_dir):
    for item in os.listdir(target_dir):
        item_path = os.path.join(target_dir, item)

        # **如果是文件夹**
        if os.path.isdir(item_path):
            if item in only_folders:
                # ✅ 只移动允许的文件夹
                shutil.move(item_path, posts_dir)
                print(f"Moved folder: {item_path}")
            else:
                # ❌ 删除不在 `only_folders` 里的文件夹
                shutil.rmtree(item_path)
                print(f"Deleted folder: {item_path}")

        # **如果是文件**
        elif os.path.isfile(item_path):
            os.remove(item_path)
            print(f"Deleted file: {item_path}")

    print("Cleanup completed.")
else:
    print(f"Directory does not exist: {target_dir}")