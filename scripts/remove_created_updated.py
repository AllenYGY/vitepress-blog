from __future__ import annotations

import re
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]
BASE_DIR = ROOT_DIR / "docs" / "posts"

TARGETS = [
    "Computer Organization/Lecture/09-Microarchitecture.md",
    "Database Management System/RDBMS/09-Relational-Database-Design-BCNF.md",
    "Database Management System/MySQL/10-Advanced-SQL.md",
    "Operating System/Lecture/10-File System Implementation.md",
    "Computer Organization/Lecture/10-ISA.md",
    "Database Management System/RDBMS/10-Relational-Database-Design-3rd-Normal-Form.md",
    "Computer Organization/Lecture/11-From-Machine-Language-to-Assembly-Language.md",
    "Record/yearly/2024.md",
    "Record/daily/2024-01-27.md",
    "Record/daily/2024-01-28.md",
    "Record/daily/2024-01-29.md",
    "Record/daily/2024-01-30.md",
    "Record/daily/2024-01-31.md",
    "Record/daily/2024-02-17.md",
    "Record/daily/2024-02-19.md",
    "Record/daily/2024-02-27.md",
    "Record/daily/2024-03-01.md",
    "Record/internship/2024-03-03.md",
    "Record/internship/2024-03-04.md",
    "Record/daily/2024-03-21.md",
    "Record/daily/2024-03-23.md",
    "Record/daily/2024-03-24.md",
    "Record/daily/2024-11-12.md",
    "Record/daily/2024-12-07.md",
    "Record/weekly/2024-w15.md",
    "Record/weekly/2024-w16.md",
    "Record/weekly/2024-w17.md",
    "Record/weekly/2024-w18.md",
    "Record/weekly/2024-w19.md",
    "Record/weekly/2024-w20.md",
    "Record/weekly/2024-w21.md",
    "Record/daily/2025-01-01.md",
    "Record/daily/2025-06-02.md",
    "Program Language/Java/Lecture/Abstract Methods and Classes Interfaces.md",
    "Deep Learning/Activation Function.md",
    "Deep Learning/00-Basic/Activation Function.md",
    "Program Language/Cpp/Algorithm-Library.md",
    "Program Language/Java/Lecture/Array and Generics.md",
    "Algorithm/DSA/B+Tree.md",
    "Program Language/R/Basic R.md",
    "Algorithm/Basic Algorithm/Basic-Algorithm-overview.md",
    "Program Language/Python/Beautiful Soup.md",
    "Program Language/Python/Project/BilibiliVista.md",
    "Contest/Leetcode/Biweekly-Contest-122.md",
    "Contest/Leetcode/Biweekly-Contest-123.md",
    "Math/Discrete Structure/Lecture/boolean-expressions.md",
    "Research/BioInfo/Ploidy/Calculate SE.md",
    "Workflow/Obsidian/Templaters/capture.md",
    "English/CET/CET-6.md",
    "Computer Network/Project/Chat-Application.md",
    "Math/Probability Statistics/Chi-Square-Tests.md",
    "Computer Organization/Assignment/Assignment-1/CO-Assignment-1.md",
    "Computer Organization/Assignment/Assignment-2/CO-Assignment-2.md",
    "Computer Organization/Assignment/Assignment-3/CO-Assignment-3.md",
    "Computer Organization/Assignment/Assignment-4/CO-Assignment-4.md",
    "Computer Organization/Lab/CO-Lab2.md",
    "Computer Organization/Lab/CO-Lab3.md",
    "Computer Organization/Lab/CO-Lab5.md",
    "Computer Organization/Lab/CO-Lab6.md",
    "Computer Organization/Lab/CO-Lab7.md",
    "Computer Organization/Lab/CO-Lab8.md",
    "Computer Network/Computer Network Overview.md",
    "Computer Organization/Computer Organization Overview.md",
    "Tools/Conda/Conda.md",
    "Math/Probability Statistics/Confidence-Interval.md",
    "Contest/Contest-Overview.md",
    "Math/Discrete Structure/Lecture/counting-principles.md",
    "Database Management System/RDBMS/Courier Station Information Management System.md",
    "Program Language/Java/Lecture/Creating Java Classes.md",
    "Web/CSS/CSS-Introduction.md",
    "Computer Vision/Lecture/CV-Back Propagation.md",
    "Algorithm/DAA/Assignment/DAA-Assignment-0.md",
    "Algorithm/DAA/Assignment/DAA-Assignment-1.md",
    "Algorithm/DAA/Assignment/DAA-Assignment-2.md",
    "Algorithm/DAA/Assignment/DAA-Programming-Assignment.md",
    "Data Analysis/Data Analysis Overview.md",
    "Database Management System/Database Management System Overview.md",
    "Program Language/Python/Datetime.md",
    "Database Management System/RDBMS/DBMS-Review.md",
    "Computer Network/Lecture/DCN Review.md",
    "Computer Network/Assignment/DCN-As-1.md",
    "Math/Discrete Structure/Assignment/Discrete Mathematics Assignment-2.md",
    "Math/Discrete Structure/Assignment/Discrete Mathematics Assignment-3.md",
    "Math/Discrete Structure/Assignment/Discrete Mathematics Assignment-5.md",
    "Math/Discrete Structure/Assignment/Discrete Mathematics Assignment-6.md",
    "Math/Discrete Structure/Assignment/Discrete Mathematics Assignment-7.md",
    "Math/Discrete Structure/Assignment/Discrete Mathematics Assignment-8.md",
    "Math/Discrete Structure/Assignment/Discrete Mathematics Tutorial.md",
    "Algorithm/Basic Algorithm/Discretization.md",
    "Algorithm/DAA/Algorithm/Divide-and-Conquer.md",
    "Tools/Docker/Docker.md",
    "Algorithm/DSA/Assignment/DSA-AS-1.md",
    "Algorithm/DSA/Assignment/DSA-As-2.md",
    "Algorithm/DSA/Assignment/DSA-AS-am.md",
    "Algorithm/DSA/DSA-B+Tree.md",
    "Algorithm/DSA/DSA-BinaryTree.md",
    "Math/Linear Algebra/Eigenvalues and Eigenvectors.md",
    "Algorithm/DAA/Algorithm/Enumeration.md",
    "Algorithm/DAA/Algorithm/Enumeration-subset.md",
    "Program Language/Java/Lecture/Exception Handling.md",
    "Program Language/C/fileoperation.md",
    "Others/Fix Income/Fixed-Income-Overview.md",
    "Math/Discrete Structure/Lecture/functions-sequence-and-summations.md",
    "Tools/Git/Git-For-Beginners.md",
    "Tools/Git/Git-Introduction.md",
    "Tools/Git/Git-Remote-Repository.md",
    "Tools/Git/Git-Workflow-Model.md",
    "Deep Learning/00-Basic/Gradient Descent.md",
    "Algorithm/DAA/Algorithm/Graph-algorithm.md",
    "Algorithm/Graph/Graph-Overview.md",
    "Math/Discrete Structure/Lecture/graph-theory.md",
    "Data Analysis/Hands on Data Analysis/Hans-On-Data-Analysis-For-Everyone.md",
    "Math/Probability Statistics/Hypothesis-Testing-Single-Population.md",
    "Math/Probability Statistics/Hypothesis-Testing-Two-Population.md",
    "Program Language/Java/Lecture/Inheritance.md",
    "Program Language/Java/Lecture/Java Introduction.md",
    "Program Language/Java/Lecture/Java Programming Essentials.md",
    "Math/Linear Algebra/Judgment.md",
    "Contest/Lanqiao/Lanqiao-Train-1.md",
    "Contest/Lanqiao/Lanqiao-Train-2.md",
    "Math/Linear Algebra/Linear Transformations.md",
    "Operating System/Extend/Linux Basic Operation.md",
    "Math/Discrete Structure/Lecture/logic-circuits.md",
    "Program Language/C/Macro.md",
    "Math/Math.md",
    "Program Language/Python/Matplotlib.md",
    "Math/Linear Algebra/Matrix Operation.md",
    "Program Language/Python/Project/Movie-Data-Analysis.md",
    "Program Language/C/Multithreads.md",
    "Operating System/Extend/NJU OS PA0.md",
    "Program Language/Python/Numpy.md",
    "Operating System/Operating System Overview.md",
    "Math/Linear Algebra/Orthogonality.md",
    "Program Language/Python/Pandas.md",
    "Research/BioInfo/Ploidy/Ploidy.md",
    "Research/BioInfo/Ploidy/Ploidy Review.md",
    "Program Language/C/Pointers.md",
    "Math/Probability Statistics/Poisson-Distribution-Midterm-Pre.md",
    "Math/Probability Statistics/Probability-Theory.md",
    "Math/Linear Algebra/Product.md",
    "Program Language/Program Language.md",
    "Math/Discrete Structure/Lecture/propositional-equivalence.md",
    "Math/Discrete Structure/Lecture/propositional-logic.md",
    "Program Language/Python/Python Basic.md",
    "Program Language/Python/Python Environment Management.md",
    "Program Language/Python/Python Exceptions.md",
    "Program Language/Python/python-environment-management.md",
    "Program Language/Python/python-exceptions.md",
    "Web/Javascript/Quick-Start.md",
    "Program Language/Javascript/quick-start.md",
    "Database Management System/Assignment/RDBMS-As-1.md",
    "Database Management System/Assignment/RDBMS-As-2.md",
    "Database Management System/Assignment/RDBMS-As-3.md",
    "Program Language/Python/Regular Expression.md",
    "Tools/Regex/Regular-Expression.md",
    "Math/Discrete Structure/Lecture/relation.md",
    "Math/Discrete Structure/Lecture/representing-graph-and-connectivity.md",
    "Math/Discrete Structure/Lecture/sets-and-n-tuple.md",
    "Tools/Shell/Shell.md",
    "Algorithm/Basic Algorithm/Sliding Window.md",
    "Algorithm/DAA/Algorithm/Sort.md",
    "Tools/Tools.md",
    "Math/Discrete Structure/Lecture/tree.md",
    "Algorithm/DAA/Tutorial/Tutorial-1.md",
]


def strip_created_updated(file_path: Path) -> str:
    try:
        raw = file_path.read_text(encoding="utf-8")
    except OSError:
        print(f"Missing: {file_path}")
        return "missing"

    if not raw.startswith("---"):
        return "unchanged"

    lines = raw.split("\n")
    end_index = -1
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end_index = i
            break

    if end_index == -1:
        return "unchanged"

    frontmatter_lines = lines[1:end_index]
    cleaned_lines = []
    changed = False
    i = 0
    while i < len(frontmatter_lines):
        line = frontmatter_lines[i]
        match = re.match(r"^(\s*)(created|updated)\s*:", line, flags=re.IGNORECASE)
        if not match:
            cleaned_lines.append(line)
            i += 1
            continue

        changed = True
        indent = len(match.group(1))
        value = line[match.end() :].strip()
        is_block = bool(re.match(r"^(\||>)([-+])?$", value))
        i += 1

        if not is_block:
            continue

        while i < len(frontmatter_lines):
            next_line = frontmatter_lines[i]
            if next_line.strip() == "":
                i += 1
                continue
            match = re.match(r"^(\s*)", next_line)
            next_indent = len(match.group(1)) if match else 0
            if next_indent > indent:
                i += 1
                continue
            break

    if not changed:
        return "unchanged"

    lines[1:end_index] = cleaned_lines
    updated = "\n".join(lines)
    if raw.endswith("\n") and not updated.endswith("\n"):
        updated += "\n"

    file_path.write_text(updated, encoding="utf-8")
    return "updated"


def main() -> None:
    updated_count = 0
    missing_count = 0

    for rel_path in TARGETS:
        file_path = BASE_DIR / rel_path
        result = strip_created_updated(file_path)
        if result == "updated":
            updated_count += 1
        elif result == "missing":
            missing_count += 1

    print(f"Updated {updated_count} file(s).")
    if missing_count:
        print(f"Missing {missing_count} file(s).")


if __name__ == "__main__":
    main()
