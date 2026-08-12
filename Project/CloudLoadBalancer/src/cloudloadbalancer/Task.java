package cloudloadbalancer;

public class Task {
    private static int counter = 0;

    private final int id;
    private final int burstTime; // simulated processing time in ms
    private final long arrivalTime;
    private String origin = "Unknown";

    public Task(int burstTime) {
        this.id = ++counter;
        this.burstTime = burstTime;
        this.arrivalTime = System.currentTimeMillis();
    }

    public int getId() {
        return id;
    }

    public int getBurstTime() {
        return burstTime;
    }

    public long getArrivalTime() {
        return arrivalTime;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getOrigin() {
        return origin;
    }

    @Override
    public String toString() {
        return "Task-" + id + " (burst=" + burstTime + "ms, from " + origin + ")";
    }
}