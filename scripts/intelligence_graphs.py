import matplotlib.pyplot as plt
import numpy as np

# First graph - limited human intelligence model
plt.figure(figsize=(8, 8))

# Create data for a curve that tapers off
x1 = np.linspace(0, 10, 1000)
y1 = 100 * (1 - np.exp(-0.5 * x1))  # Curve that asymptotes to 100

# Plot the curve
plt.plot(x1, y1, 'b-', linewidth=2.5)

# Add dots and labels for chicken, average human, and Einstein
chicken_x, chicken_y = 0.8, 100 * (1 - np.exp(-0.5 * 0.8))
avg_human_x, avg_human_y = 8, 100 * (1 - np.exp(-0.5 * 8))
einstein_x, einstein_y = 8.3, 100 * (1 - np.exp(-0.5 * 8.3))  # Moved closer to avg human

# Plot the dots
plt.scatter(chicken_x, chicken_y, color='red', s=100, zorder=5)
plt.scatter(avg_human_x, avg_human_y, color='green', s=100, zorder=5)
plt.scatter(einstein_x, einstein_y, color='purple', s=100, zorder=5)

# Add labels near the dots
plt.text(chicken_x + 0.3, chicken_y - 1, 'Chicken', fontsize=16, color='red')
plt.text(avg_human_x - 0.6, avg_human_y - 6, 'Average Human', fontsize=16, color='green')
plt.text(einstein_x + 0.2, einstein_y + 2, 'Einstein', fontsize=16, color='purple')

# Set labels
plt.ylabel('Intelligence', fontsize=14)

# Remove x-ticks, y-ticks, and horizontal asymptote line
plt.xticks([])
plt.yticks([])
plt.tight_layout()

# Save the first graph
plt.savefig('limited_intelligence_model.png', dpi=300, bbox_inches='tight')
plt.close()

# Second graph - unlimited intelligence potential model
plt.figure(figsize=(8, 8))

# Create data for a curve that continues upward
x2 = np.linspace(0, 10, 1000)
y2 = np.power(x2, 2.5) * 10

# Plot the curve
plt.plot(x2, y2, 'b-', linewidth=2.5)

# Position the points
chicken_x2, chicken_y2 = 1.5, np.power(1.5, 2.5) * 10
avg_human_x2, avg_human_y2 = 4.0, np.power(4.0, 2.5) * 10
einstein_x2, einstein_y2 = 4.2, np.power(4.2, 2.5) * 10
superintelligence_x2, superintelligence_y2 = 9.5, np.power(9.5, 2.5) * 10

# Plot the dots
plt.scatter(chicken_x2, chicken_y2, color='red', s=100, zorder=5)
plt.scatter(avg_human_x2, avg_human_y2, color='green', s=100, zorder=5)
plt.scatter(einstein_x2, einstein_y2, color='purple', s=100, zorder=5)
plt.scatter(superintelligence_x2, superintelligence_y2, color='darkblue', s=100, zorder=5)

# Add labels near the dots but not overlapping - moved labels farther down
plt.text(chicken_x2 - 0.4, chicken_y2 - 95, 'Chicken', fontsize=16, color='red')  # Moved farther below the dot
plt.text(avg_human_x2 + 0.1, avg_human_y2 - 100, 'Average Human', fontsize=16, color='green')  # Moved farther below
plt.text(einstein_x2 + 0.2, einstein_y2 - 25, 'Einstein', fontsize=16, color='purple')
plt.text(superintelligence_x2 - 1.7, superintelligence_y2 - 110, 'Superintelligence', fontsize=16, color='darkblue', fontweight='bold')

# Set labels
plt.ylabel('Intelligence', fontsize=14)

# Remove x-ticks and y-ticks
plt.xticks([])
plt.yticks([])
plt.tight_layout()

# Save the second graph
plt.savefig('unlimited_intelligence_model.png', dpi=300, bbox_inches='tight')
