import os

def process_md_file(file_path):
    # 读取文件内容
    with open(file_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    # 检查元信息部分是否以 `---` 开始并查找第一个结束行
    if len(lines) < 3 or not lines[0].strip() == "---":
        print(f"文件格式有误，跳过: {file_path}")
        return

    # 找到元信息的结束 `---`
    try:
        end_metadata_idx = lines[1:].index('---\n') + 1
    except ValueError:
        print(f"元信息未正确关闭，跳过: {file_path}")
        return

    # 提取元信息部分
    metadata = "".join(lines[:end_metadata_idx + 1])

    # 检查是否已经有 `publish` 字段
    if "publish:" in metadata:
        print(f"文件已包含 `publish` 字段，跳过: {file_path}")
        return

    # 修改元信息，添加 `publish: True`
    new_metadata = metadata.strip()[:-4] + "\npublish: True\n---\n"

    # 替换文件内容
    lines[:end_metadata_idx + 1] = new_metadata.splitlines(keepends=True)
    with open(file_path, "w", encoding="utf-8") as f:
        f.writelines(lines)

    print(f"成功修改文件: {file_path}")

# 遍历文件夹并处理所有 .md 文件
def process_folder(folder_path):
    for root, _, files in os.walk(folder_path):
        for file in files:
            # 仅处理 .md 文件
            if file.endswith(".md"):
                file_path = os.path.join(root, file)
                process_md_file(file_path)

# 指定文件夹路径
folder_path = "../NOTE"  # 替换为你的文件夹路径

# 调用处理函数
process_folder(folder_path)
