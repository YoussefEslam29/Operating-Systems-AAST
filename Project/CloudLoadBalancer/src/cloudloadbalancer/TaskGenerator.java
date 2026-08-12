package cloudloadbalancer;

import java.util.Random;

public class TaskGenerator implements Runnable {
    private final LoadBalancer loadBalancer;
    private final int numTasks;
    private final int minDelayMs;
    private final int maxDelayMs;
    private volatile boolean running = true;

    private static final String[] SAMPLE_IPS = {
        "8.8.8.8",         // USA
        "1.1.1.1",         // USA
        "41.34.0.1",       // Egypt
        "196.219.0.1",     // Egypt
        "185.60.216.35",   // Ireland
        "not-a-real-ip"    // intentionally invalid, verifies GeoLocator's fallback handling
    };

    public TaskGenerator(LoadBalancer loadBalancer, int numTasks, int minDelayMs, int maxDelayMs) {
        this.loadBalancer = loadBalancer;
        this.numTasks = numTasks;
        this.minDelayMs = minDelayMs;
        this.maxDelayMs = maxDelayMs;
    }

    public void stop() {
        running = false;
    }

    @Override
    public void run() {
        Random random = new Random();
        System.out.println("[TaskGenerator] started.");

        for (int i = 0; i < numTasks && running; i++) {
            int burstTime = 500 + random.nextInt(1500); // 500-2000ms of "work"
            Task task = new Task(burstTime);

            String ip = SAMPLE_IPS[random.nextInt(SAMPLE_IPS.length)];
            String location = GeoLocator.lookup(ip);
            task.setOrigin(location);

            loadBalancer.dispatch(task);

            int delay = minDelayMs + random.nextInt(maxDelayMs - minDelayMs + 1);
            try {
                Thread.sleep(delay);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }

        System.out.println("[TaskGenerator] finished generating tasks.");
    }
}