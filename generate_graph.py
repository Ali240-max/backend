import os
import json
import matplotlib.pyplot as plt

# Step 1: Read data.json
json_file = os.path.join(os.path.dirname(__file__), "data", "data.json")

with open(json_file, "r") as f:
    data = json.load(f)

# Step 2: Extract time and concentration as floats
time = [float(point["time"]) for point in data]
concentration = [float(point["concentration"]) for point in data]

# Step 3: Plot graph
plt.figure(figsize=(8, 5))
plt.plot(time, concentration, marker='o', linestyle='-', color='blue')
plt.title("Concentration vs Time")
plt.xlabel("Time (hours)")
plt.ylabel("Concentration (mg/L)")
plt.grid(True)

# Step 4: Save image to public/ so React can access it
# Save the image to a folder inside the backend project
output_file = os.path.join(os.path.dirname(__file__), "static", "output.png")

os.makedirs(os.path.dirname(output_file), exist_ok=True)

plt.savefig(output_file, dpi=300)
print(f" Graph saved to: {output_file}")
