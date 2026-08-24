import json
import os

FILE_NAME = "tasks.json"


# Load tasks from JSON file
def load_tasks():
    if os.path.exists(FILE_NAME):
        try:
            with open(FILE_NAME, "r") as file:
                data = json.load(file)

                converted_tasks = []

                for task in data:
                    # Support old task format
                    if isinstance(task, str):
                        converted_tasks.append({
                            "task": task,
                            "completed": False
                        })
                    else:
                        converted_tasks.append(task)

                return converted_tasks

        except (json.JSONDecodeError, FileNotFoundError):
            return []

    return []


# Save tasks to JSON file
def save_tasks():
    with open(FILE_NAME, "w") as file:
        json.dump(tasks, file, indent=4)


# Add Task
def add_task():
    task = input("Enter your task: ").strip()

    if task:
        tasks.append({
            "task": task,
            "completed": False
        })

        save_tasks()
        print("Task added successfully!")
    else:
        print("Task cannot be empty!")


# View Tasks
def view_tasks():
    if not tasks:
        print("\nNo tasks available!")
        return

    print("\n========== YOUR TASKS ==========")

    for i, task in enumerate(tasks, start=1):
        status = "Completed" if task["completed"] else "Pending"
        print(f"{i}. {task['task']} [{status}]")

    print("================================")


# Complete Task
def complete_task():
    if not tasks:
        print("\nNo tasks available!")
        return

    view_tasks()

    try:
        task_number = int(
            input("Enter task number to mark as completed: ")
        )

        if 1 <= task_number <= len(tasks):

            if tasks[task_number - 1]["completed"]:
                print("Task is already completed!")
            else:
                tasks[task_number - 1]["completed"] = True
                save_tasks()
                print("Task marked as completed!")

        else:
            print("Invalid task number!")

    except ValueError:
        print("Please enter a valid number!")


# Edit Task
def edit_task():
    if not tasks:
        print("\nNo tasks available!")
        return

    view_tasks()

    try:
        task_number = int(
            input("Enter task number to edit: ")
        )

        if 1 <= task_number <= len(tasks):

            new_task = input("Enter new task: ").strip()

            if new_task:
                tasks[task_number - 1]["task"] = new_task
                save_tasks()
                print("Task updated successfully!")
            else:
                print("Task cannot be empty!")

        else:
            print("Invalid task number!")

    except ValueError:
        print("Please enter a valid number!")


# Search Task
def search_task():
    if not tasks:
        print("\nNo tasks available!")
        return

    keyword = input("Enter task to search: ").strip().lower()

    if not keyword:
        print("Search cannot be empty!")
        return

    found = False

    print("\n========== SEARCH RESULTS ==========")

    for i, task in enumerate(tasks, start=1):

        if keyword in task["task"].lower():

            status = "Completed" if task["completed"] else "Pending"

            print(f"{i}. {task['task']} [{status}]")

            found = True

    if not found:
        print("No matching tasks found.")

    print("====================================")


# Delete Task
def delete_task():
    if not tasks:
        print("\nNo tasks available!")
        return

    view_tasks()

    try:
        task_number = int(
            input("Enter task number to delete: ")
        )

        if 1 <= task_number <= len(tasks):

            deleted_task = tasks.pop(task_number - 1)

            save_tasks()

            print(f"Task deleted: {deleted_task['task']}")

        else:
            print("Invalid task number!")

    except ValueError:
        print("Please enter a valid number!")


# Load existing tasks
tasks = load_tasks()


# Main Program
while True:

    print("\n========== PYTHON TODO MANAGER ==========")
    print("1. Add Task")
    print("2. View Tasks")
    print("3. Complete Task")
    print("4. Edit Task")
    print("5. Search Task")
    print("6. Delete Task")
    print("7. Exit")
    print("=========================================")

    choice = input("Enter your choice (1-7): ").strip()

    if choice == "1":
        add_task()

    elif choice == "2":
        view_tasks()

    elif choice == "3":
        complete_task()

    elif choice == "4":
        edit_task()

    elif choice == "5":
        search_task()

    elif choice == "6":
        delete_task()

    elif choice == "7":
        print("\nThank you for using Python Todo Manager!")
        break

    else:
        print("Invalid choice! Please select 1-7.")