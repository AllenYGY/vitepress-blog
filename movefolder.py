import os
import shutil

# 保留的文件夹列表
only_folders = {
    "Algorithm", "Bioinfo", "Data Analysis", "Program", "Web",
    "Database Management System", "Research", "Deep Learning", "Share",
    "Computer Organization", "Computer Network", "Operating System",
    "Computer Vision", "Machine Learning", "Theory Of Computation",
    "Compiler Construction", "Tools"
}

# 目标文件夹
target_dir = os.path.abspath("./docs/NOTE")  # 源目录
posts_dir = os.path.abspath("./docs/posts")  # 目标目录

# 确保目标 posts 目录存在
os.makedirs(posts_dir, exist_ok=True)

# 判断是否是可解析的文本文件
def is_text_file(file_path):
    return file_path.endswith('.md')

# 判断文件是否需要保留
def should_keep_file(file_path):
    if not is_text_file(file_path):
        return False  # 跳过非文本文件

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()

        # 检查 YAML Front Matter 的开始标记
        if lines[0].strip() == '---':
            metadata = {}
            for line in lines[1:]:
                if line.strip() == '---':
                    break
                key, _, value = line.partition(':')
                metadata[key.strip()] = value.strip()

            return metadata.get('publish', '').lower() == 'true'
    except Exception as e:
        print(f"Error reading metadata from {file_path}: {e}")
        return False

    return False

# 递归清理文件夹
def process_folder(folder_path):
    is_empty = True
    for item in os.listdir(folder_path):
        item_path = os.path.join(folder_path, item)

        try:
            if os.path.isdir(item_path):
                if not process_folder(item_path):
                    shutil.rmtree(item_path)
                    print(f"Deleted empty folder: {item_path}")
                else:
                    is_empty = False
            elif os.path.isfile(item_path):
                if should_keep_file(item_path):
                    is_empty = False
                else:
                    os.remove(item_path)
                    print(f"Deleted file: {item_path}")
        except Exception as e:
            print(f"Error processing {item_path}: {e}")
            continue

    return not os.listdir(folder_path)

# 主程序逻辑
if os.path.exists(target_dir):
    for item in os.listdir(target_dir):
        item_path = os.path.join(target_dir, item)

        if os.path.isdir(item_path):
            if item in only_folders:
                if not process_folder(item_path):
                    shutil.move(item_path, posts_dir)
                    print(f"Moved folder: {item_path}")
                else:
                    shutil.rmtree(item_path)
                    print(f"Deleted empty folder: {item_path}")
            else:
                shutil.rmtree(item_path)
                print(f"Deleted folder: {item_path}")
        elif os.path.isfile(item_path):
            os.remove(item_path)
            print(f"Deleted file: {item_path}")

    print("Cleanup completed.")
else:
    print(f"Directory {target_dir} does not exist!")
