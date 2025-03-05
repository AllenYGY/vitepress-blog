import os
import shutil

# 声明需要保留的文件夹列表
only_folders = {
    "Algorithm", "Bioinfo", "Data Analysis", "Program", "Web",
    "Database Management System", "Research", "Deep Learning", "Share",
    "Computer Organization", "Computer Network", "Operating System",
    "Computer Vision", "Machine Learning", "Theory Of Computation",
    "Compiler Construction", "Tools","Computer Graphics"
}

# 源目录和目标目录
target_dir = os.path.abspath("./docs/NOTE")  # NOTE 文件夹
posts_dir = os.path.abspath("./docs/posts")  # posts 文件夹

# 确保目标目录（posts 文件夹）存在
os.makedirs(posts_dir, exist_ok=True)

# 判断是否是 Markdown 文件
def is_text_file(file_path):
    return file_path.endswith('.md')

# 检查文件是否需要保留
def should_keep_file(file_path):
    if not is_text_file(file_path):
        return False  # 非 Markdown 文件直接移除

    try:
        # 尝试读取文件内容
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        # 检查 YAML Front Matter 的起止标记 `---`
        if lines[0].strip() == '---':
            metadata = {}
            for line in lines[1:]:
                if line.strip() == '---':  # 结束块
                    break
                key, _, value = line.partition(':')
                metadata[key.strip()] = value.strip()

            # 检查是否有 'publish: true'
            return metadata.get('publish', '').lower() == 'true'
    except Exception as e:
        # 如果遇到错误，则认为文件无效，不保留
        print(f"Error reading metadata from {file_path}: {e}")
        return False

    # 如果没有元信息，默认不保留
    return False

# 递归清理文件夹
def process_folder(folder_path):
    """
    递归处理文件夹：删除无用文件或子文件夹
    如果文件夹最终为空，返回 True 表示可以删除。
    """
    print(f"Processing folder: {folder_path}")
    is_empty = True  # 假设文件夹一开始是空的

    for item in os.listdir(folder_path):
        item_path = os.path.join(folder_path, item)

        if os.path.isdir(item_path):
            # 处理子目录
            if process_folder(item_path):  # 如果子目录为空，删除它
                try:
                    shutil.rmtree(item_path)
                    print(f"Deleted empty folder: {item_path}")
                except Exception as e:
                    print(f"Error deleting folder {item_path}: {e}")
                    is_empty = False
            else:
                is_empty = False  # 如果子目录非空，则当前目录也非空
        elif os.path.isfile(item_path):
            # 处理文件
            if should_keep_file(item_path):  # 检查是否保留文件
                is_empty = False
            else:
                try:
                    os.remove(item_path)  # 删除不符合要求的文件
                    print(f"Deleted file: {item_path}")
                except Exception as e:
                    print(f"Error deleting file {item_path}: {e}")
                    is_empty = False

    # 如果文件夹为空且无文件或目录，则返回 True
    return is_empty and not os.listdir(folder_path)

# 主功能：处理 NOTE 文件夹，将内容移动到 posts 中，并最终删除 NOTE 文件夹
if os.path.exists(target_dir):
    for item in os.listdir(target_dir):
        item_path = os.path.join(target_dir, item)

        if os.path.isdir(item_path):
            # 对符合规则的文件夹递归处理
            if item in only_folders:
                if process_folder(item_path):  # 递归清理，如果文件夹为空
                    try:
                        # 移动目录到 posts 目录
                        shutil.move(item_path, posts_dir)
                        print(f"Moved folder: {item_path}")
                    except Exception as e:
                        print(f"Error moving folder {item_path}: {e}")
                else:
                    # 如果处理后目录不为空，也把它移动到目标目录
                    try:
                        shutil.move(item_path, posts_dir)
                        print(f"Moved folder: {item_path}")
                    except Exception as e:
                        print(f"Error moving folder {item_path}: {e}")
            else:
                # 不符合规则的文件夹，直接删除
                try:
                    shutil.rmtree(item_path)
                    print(f"Deleted folder: {item_path}")
                except Exception as e:
                    print(f"Error deleting folder {item_path}: {e}")
        elif os.path.isfile(item_path):
            # 如果有直接位于 NOTE 目录中的文件，直接删除
            try:
                os.remove(item_path)
                print(f"Deleted file: {item_path}")
            except Exception as e:
                print(f"Error deleting file {item_path}: {e}")

    # 确保 `NOTE` 文件夹为空后删除它
    try:
        shutil.rmtree(target_dir)
        print(f"Deleted NOTE folder: {target_dir}")
    except Exception as e:
        print(f"Error deleting NOTE folder {target_dir}: {e}")
else:
    print(f"Directory {target_dir} does not exist!")
