from flask import Flask, jsonify, request, render_template
from database import load_tasks, add_task, delete_task, complete_task, edit_task
try:
    from flask_cors import CORS
except ImportError:
    CORS = None

app = Flask(__name__)
if CORS:
    CORS(app)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify(load_tasks())


@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()

    if not data or "task" not in data or not str(data["task"]).strip():
        return jsonify({"error": "Task is required"}), 400

    task = str(data["task"]).strip()
    description = str(data.get("description", "")).strip()
    due_date = str(data.get("due_date", "")).strip()
    category = str(data.get("category", "Work")).strip()
    priority = str(data.get("priority", "Low")).strip()

    add_task(
        task=task,
        description=description,
        due_date=due_date,
        category=category,
        priority=priority
    )

    return jsonify({
        "message": "Task added successfully"
    }), 201


@app.route("/tasks/<int:index>/complete", methods=["PUT"])
def mark_complete(index):
    complete_task(index)

    return jsonify({
        "message": "Task completed successfully"
    })


@app.route("/tasks/<int:index>", methods=["DELETE"])
def remove_task(index):
    delete_task(index)

    return jsonify({
        "message": "Task deleted successfully"
    })


@app.route("/tasks/<int:index>", methods=["PUT"])
def update_task(index):
    data = request.get_json()

    if not data or not str(data.get("task", "")).strip():
        return jsonify({"error": "Task is required"}), 400

    task = str(data["task"]).strip()
    description = data.get("description")
    if description is not None:
        description = str(description).strip()
    due_date = data.get("due_date")
    if due_date is not None:
        due_date = str(due_date).strip()
    category = data.get("category")
    if category is not None:
        category = str(category).strip()
    priority = data.get("priority")
    if priority is not None:
        priority = str(priority).strip()

    if not edit_task(index, task, description=description, due_date=due_date, category=category, priority=priority):
        return jsonify({"error": "Task not found"}), 404

    return jsonify({
        "message": "Task updated successfully"
    })

if __name__ == "__main__":
    app.run(debug=True)
   