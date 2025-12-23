import os
import shutil

ONLY_FOLDERS = {
    "Algorithm",
    "Bioinformatics",
    "Data Analysis",
    "Web",
    "Database Management System",
    "Research",
    "Deep Learning",
    "Share",
    "Computer Organization",
    "Computer Network",
    "Operating System",
    "Computer Vision",
    "Machine Learning",
    "Numerical Computation",
    "Theory Of Computation",
    "Compiler Construction",
    "Tools",
    "Computer Graphics",
    "Software Engineering",
    # "Functional Programming",
    "Bayesian Network",
}

# 源目录和目标目录
NOTE_DIR = os.path.abspath("./docs/NOTE")  # NOTE 文件夹
POSTS_DIR = os.path.abspath("./docs/posts")  # posts 文件夹


# --- 辅助函数 (无需修改) ---
def is_markdown_file(file_path):
    """判断是否是 Markdown 文件"""
    return file_path.lower().endswith(".md")


def should_keep_file(file_path):
    """
    检查文件是否需要保留：
    1. 必须是 Markdown 文件。
    2. 必须包含 'publish: true' 的元信息。
    """
    if not is_markdown_file(file_path):
        return False  # 非 Markdown 文件直接移除

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            lines = f.readlines()

        # 至少需要3行来构成一个有效的 front matter (---, key: value, ---)
        if len(lines) < 3 or lines[0].strip() != "---":
            return False

        metadata = {}
        # 从第二行开始解析
        for line in lines[1:]:
            if line.strip() == "---":  # 遇到结束标记
                break
            # 使用 partition 确保正确分割，即使值中含有冒号
            key, sep, value = line.partition(":")
            if sep:  # 确保冒号存在
                metadata[key.strip()] = value.strip()

        return metadata.get("publish", "").lower() == "true"
    except Exception as e:
        print(f"Error reading metadata from {file_path}: {e}")
        return False  # 读取出错的文件不保留


def recursive_clean_folder(folder_path):
    """
    递归清理文件夹内部，删除无用文件。
    如果文件夹处理后变为空，则返回 True，否则返回 False。
    """
    print(f"-> Recursively cleaning folder: {folder_path}")
    is_empty_after_cleaning = True

    # 使用 list(os.scandir(...)) 复制一个快照，防止在遍历时删除元素导致问题
    for entry in list(os.scandir(folder_path)):
        item_path = entry.path
        if entry.is_dir():
            if recursive_clean_folder(item_path):
                try:
                    shutil.rmtree(item_path)
                    print(f"  - Deleted now-empty subfolder: {item_path}")
                except OSError as e:
                    print(f"  - Error deleting folder {item_path}: {e}")
                    is_empty_after_cleaning = False  # 删除失败，则父目录不为空
            else:
                is_empty_after_cleaning = False  # 子目录非空

        elif entry.is_file():
            if should_keep_file(item_path):
                is_empty_after_cleaning = False  # 有文件被保留
            else:
                try:
                    os.remove(item_path)
                    print(f"  - Deleted file: {item_path}")
                except OSError as e:
                    print(f"  - Error deleting file {item_path}: {e}")
                    is_empty_after_cleaning = False

    return is_empty_after_cleaning


# --- 主逻辑函数 ---


def process_note_to_posts():
    """
    处理 NOTE 文件夹，将内容清理后移动到 posts 文件夹。
    这是原始脚本的主要逻辑。
    """
    print("=" * 50)
    print(f"Processing NOTE directory: {NOTE_DIR}")
    print("=" * 50)

    # 遍历 NOTE 文件夹
    for item in os.listdir(NOTE_DIR):
        item_path = os.path.join(NOTE_DIR, item)

        if os.path.isdir(item_path):
            if item in ONLY_FOLDERS:
                print(f"Processing whitelisted folder: {item}")
                recursive_clean_folder(item_path)

                # 不管清理后是否为空，只要是白名单里的，都尝试移动
                # 如果为空，移动后posts那边会有一个空目录，也可以接受
                try:
                    # shutil.move 会自动处理目标已存在的情况，但为安全起见，我们先确保目标不存在
                    dest_path = os.path.join(POSTS_DIR, item)
                    if os.path.exists(dest_path):
                        shutil.rmtree(dest_path)  # 如果目标位置已存在，先删除
                    shutil.move(item_path, POSTS_DIR)
                    print(f"Moved folder '{item}' to {POSTS_DIR}")
                except Exception as e:
                    print(f"Error moving folder {item_path}: {e}")
            else:
                # 不在白名单中的文件夹，直接删除
                print(f"Deleting non-whitelisted folder: {item_path}")
                shutil.rmtree(item_path)

        elif os.path.isfile(item_path):
            # NOTE 根目录下的文件，直接删除
            print(f"Deleting file in NOTE root: {item_path}")
            os.remove(item_path)

    # 最后删除空的 NOTE 文件夹
    try:
        shutil.rmtree(NOTE_DIR)
        print(f"Successfully cleaned and deleted NOTE folder: {NOTE_DIR}")
    except OSError as e:
        print(f"Error deleting final NOTE folder {NOTE_DIR}: {e}")


def clean_posts_directly():
    """
    当 NOTE 文件夹不存在时，直接清理 posts 文件夹。
    """
    print("=" * 50)
    print(f"NOTE directory not found. Cleaning posts directory directly: {POSTS_DIR}")
    print("=" * 50)

    if not os.path.exists(POSTS_DIR):
        print(f"Posts directory '{POSTS_DIR}' also does not exist. Nothing to do.")
        return
    # 遍历 posts 文件夹
    for item in os.listdir(POSTS_DIR):
        item_path = os.path.join(POSTS_DIR, item)

        if os.path.isdir(item_path):
            if item in ONLY_FOLDERS:
                # 在白名单中，递归清理其内部
                print(f"Cleaning whitelisted folder: {item}")
                if recursive_clean_folder(item_path):
                    # 如果清理后变为空，则删除
                    print(f"Deleting now-empty folder: {item_path}")
                    shutil.rmtree(item_path)
            else:
                # 不在白名单中，直接删除
                print(f"Deleting non-whitelisted folder: {item_path}")
                shutil.rmtree(item_path)

        elif os.path.isfile(item_path):
            # posts 根目录下的文件，直接删除
            print(f"Deleting file in posts root: {item_path}")
            os.remove(item_path)

    print("Finished cleaning posts directory.")


if __name__ == "__main__":
    os.makedirs(POSTS_DIR, exist_ok=True)
    if os.path.exists(NOTE_DIR):
        # 如果 NOTE 目录存在，执行移动和清理流程
        process_note_to_posts()
    else:
        # 如果 NOTE 目录不存在，直接清理 posts 目录
        clean_posts_directly()
