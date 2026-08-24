import json
import os

FILE_NAME = "tasks.json"


def load_tasks():
    if not os.path.exists(FILE_NAME):
        return []

    try:
        with open(FILE_NAME, "r") as file:
            return json.load(file)
    except (json.JSONDecodeError, FileNotFoundError):
        return []


def save_tasks(tasks):
    with open(FILE_NAME, "w") as file:
        json.dump(tasks, file, indent=4)


def add_task(task, description="", due_date="", category="Work", priority="Low"):
    tasks = load_tasks()

    tasks.append({
        "task": task,
        "description": description,
        "due_date": due_date,
        "category": category,
        "priority": priority,
        "completed": False
    })

    save_tasks(tasks)


def delete_task(index):
    tasks = load_tasks()

    if 0 <= index < len(tasks):
        tasks.pop(index)
        save_tasks(tasks)


def complete_task(index):
    tasks = load_tasks()

    if 0 <= index < len(tasks):
        tasks[index]["completed"] = True
        save_tasks(tasks)


def edit_task(index, new_task, description=None, due_date=None, category=None, priority=None):
    tasks = load_tasks()

    if 0 <= index < len(tasks):
        tasks[index]["task"] = new_task
        if description is not None:
            tasks[index]["description"] = description
        if due_date is not None:
            tasks[index]["due_date"] = due_date
        if category is not None:
            tasks[index]["category"] = category
        if priority is not None:
            tasks[index]["priority"] = priority
        save_tasks(tasks)
        return True

    return False
       