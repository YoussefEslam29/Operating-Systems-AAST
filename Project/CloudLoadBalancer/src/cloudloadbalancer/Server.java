package cloudloadbalancer;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

public class Server implements Runnable {
    private final int serverId;
    private final BlockingQueue<Task> taskQueue;
    private volatile boolean running = true;

    private int tasksCompleted = 0;
    private long totalBusyTime = 0; // milliseconds

    public Server(int serverId) {
        this.serverId = serverId;
        this.taskQueue = new LinkedBlockingQueue<>();
    }

    public int getServerId() {
        return serverId;
    }

    // Called by the LoadBalancer to hand this server a new task
    public void assignTask(Task task) {
        taskQueue.add(task);
    }

    public int getQueueSize() {
        return taskQueue.size();
    }

    public int getTasksCompleted() {
        return tasksCompleted;
    }

    public long getTotalBusyTime() {
        return totalBusyTime;
    }

    public void stop() {
        running = false;
    }

    @Override
    public void run() {
        System.out.println("[Server-" + serverId + "] started.");
        while (running) {
            try {
                Task task = taskQueue.take(); // blocks until a task is available
                System.out.println("[Server-" + serverId + "] processing " + task
                        + " on thread " + Thread.currentThread().getName());
                Thread.sleep(task.getBurstTime()); // simulate work
                tasksCompleted++;
                totalBusyTime += task.getBurstTime();
                System.out.println("[Server-" + serverId + "] finished " + task);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
        System.out.println("[Server-" + serverId + "] stopped.");
    }
}