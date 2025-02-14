import os
import shutil

# 需要保留的文件夹名称
only_folders = {
    "Algorithm", "Bioinfo", "Data Analysis", "Program", "Web",
    "Database Management System", "Research", "Deep Learning", "Share",
    "Computer Organization", "Computer Network", "Operating System",
    "Computer Vision", "Machine Learning", "Theory Of Computation",
    "Compiler Construction", "Tools"
}

# 源目录和目标目录
target_dir = os.path.abspath("./docs/NOTE")
posts_dir = os.path.abspath("./docs/posts")

# 确保目标 posts 目录存在
os.makedirs(posts_dir, exist_ok=True)

# 判断是否是 Markdown 文件
def is_text_file(file_path):
    return file_path.endswith('.md')

# 检查文件是否需要保留
def should_keep_file(file_path):
    if not is_text_file(file_path):
        return False  # 跳过非 Markdown 文件

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        # 检查 YAML Front Matter
        if lines[0].strip() == '---':
            metadata = {}
            for line in lines[1:]:
                if line.strip() == '---':  # 结束块
                    break
                key, _, value = line.partition(':')
                metadata[key.strip()] = value.strip()

            # 检查 'publish' 是否为 'true'
            return metadata.get('publish', '').lower() == 'true'
    except Exception as e:
        print(f"Error reading metadata from {file_path}: {e}")
        return False

    return False

# 递归清理文件夹
def process_folder(folder_path):
    """
    递归处理文件夹，清理无用文件和空文件夹。如果文件夹内部为空，返回 True。
    """
    print(f"Processing folder: {folder_path}")
    is_empty = True  # 假设文件夹初始为空

    for item in os.listdir(folder_path):
        item_path = os.path.join(folder_path, item)

        if os.path.isdir(item_path):
            # 如果是子目录，递归处理
            if process_folder(item_path):
                try:
                    shutil.rmtree(item_path)  # 子目录为空时删除
                    print(f"Deleted empty folder: {item_path}")
                except Exception as e:
                    print(f"Error deleting folder {item_path}: {e}")
                    is_empty = False
            else:
                is_empty = False  # 子目录非空，不能删除
        elif os.path.isfile(item_path):
            # 如果是文件，检查是否需要保留
            if should_keep_file(item_path):
                is_empty = False
            else:
                try:
                    os.remove(item_path)
                    print(f"Deleted file: {item_path}")
                except Exception as e:
                    print(f"Error deleting file {item_path}: {e}")
                    is_empty = False

    # 如果文件夹为空且内部无文件/目录，则返回 True
    return is_empty and not os.listdir(folder_path)

# 主程序逻辑
if os.path.exists(target_dir):
    for item in os.listdir(target_dir):
        item_path = os.path.join(target_dir, item)

        if os.path.isdir(item_path):
            # 如果是允许的文件夹，根据规则递归处理
            if item in only_folders:
                if process_folder(item_path):
                    # 移动非空的允许文件夹
                    try:
                        shutil.move(item_path, posts_dir)
                        print(f"Moved folder: {item_path}")
                    except Exception as e:
                        print(f"Error moving folder {item_path}: {e}")
                else:
                    print(f"Processed folder (kept): {item_path}")
            else:
                # 不在允许列表中的文件夹直接删除
                try:
                    shutil.rmtree(item_path)
                    print(f"Deleted folder: {item_path}")
                except Exception as e:
                    print(f"Error deleting folder {item_path}: {e}")
        elif os.path.isfile(item_path):
            # 删除直接位于目标目录下的文件
            try:
                os.remove(item_path)
                print(f"Deleted file: {item_path}")
            except Exception as e:
                print(f"Error deleting file {item_path}: {e}")

    print("Cleanup completed.")
else:
    print(f"Directory {target_dir} does not exist!")
