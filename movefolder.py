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

# 判断文件是否需要保留（根据其 publish 属性）
def should_keep_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        # 检查 YAML Front Matter 的起止标记 `---`
        if lines[0].strip() == '---':
            # 收集 Front Matter 块内的内容
            metadata = {}
            for line in lines[1:]:
                if line.strip() == '---':  # 结束块
                    break
                # 解析元信息的键值对
                key, _, value = line.partition(':')
                metadata[key.strip()] = value.strip()

            # 返回 publish 属性的值是否为 "true"
            return metadata.get('publish', '').lower() == 'true'
    except Exception as e:
        # 如果解析失败，默认文件不保留
        print(f"Error reading metadata from {file_path}: {e}")
        return False

    # 如果文件没有 YAML Front Matter，默认不保留
    return False

# 递归清理文件夹
def process_folder(folder_path):
    is_empty = True  # 默认认为文件夹是空的
    for item in os.listdir(folder_path):
        item_path = os.path.join(folder_path, item)

        if os.path.isdir(item_path):
            # 如果是子目录，递归清理
            if not process_folder(item_path):
                # 如果子目录最终是空的，删除子目录
                os.rmdir(item_path)
                print(f"Deleted empty folder: {item_path}")
            else:
                is_empty = False
        elif os.path.isfile(item_path):
            # 如果是文件，判断是否删除
            if should_keep_file(item_path):
                is_empty = False  # 有文件需要保留，文件夹就不是空的
            else:
                os.remove(item_path)
                print(f"Deleted file: {item_path}")

    return not os.listdir(folder_path)  # 如果文件夹是空的，返回 True，否则返回 False

# 主程序：处理 NOTE 目录
if os.path.exists(target_dir):
    for item in os.listdir(target_dir):
        item_path = os.path.join(target_dir, item)

        # **如果是文件夹**
        if os.path.isdir(item_path):
            if item in only_folders:
                # ✅ 如果是允许的文件夹，扫描并处理其内容
                if not process_folder(item_path):
                    # 处理后移动到目标目录
                    shutil.move(item_path, posts_dir)
                    print(f"Moved folder: {item_path}")
                else:
                    # 如果处理后是空的，直接删除
                    os.rmdir(item_path)
                    print(f"Deleted empty folder: {item_path}")
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
