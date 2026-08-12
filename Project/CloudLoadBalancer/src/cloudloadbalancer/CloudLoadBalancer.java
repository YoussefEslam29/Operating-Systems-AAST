package cloudloadbalancer;

import java.util.ArrayList;
import java.util.List;

public class CloudLoadBalancer {

    public static void main(String[] args) throws InterruptedException {
        int numServers = 3;
        List<Server> servers = new ArrayList<>();
        List<Thread> serverThreads = new ArrayList<>();

        // Start the servers (VMs) as threads
        for (int i = 1; i <= numServers; i++) {
            Server server = new Server(i);
            servers.add(server);
            Thread t = new Thread(server, "Server-" + i);
            serverThreads.add(t);
            t.start();
        }

        LoadBalancer loadBalancer = new LoadBalancer(servers);

        // Start the task generator on its own thread
        TaskGenerator generator = new TaskGenerator(loadBalancer, 10, 200, 800);
        Thread generatorThread = new Thread(generator, "TaskGenerator");
        generatorThread.start();

        // Wait for the generator to finish producing tasks
        generatorThread.join();

        // Let servers finish remaining queued work, then shut down
        Thread.sleep(5000);
        for (Server server : servers) {
            server.stop();
        }
        for (Thread t : serverThreads) {
            t.interrupt(); // wake up any server still blocked on take()
        }
        for (Thread t : serverThreads) {
            t.join(); // wait for each server thread to fully finish before continuing
        }

        System.out.println("=== Simulation complete ===");
        printSummary(servers);

    }

    private static void printSummary(List<Server> servers) {
        System.out.println();
        System.out.println("=== Load Balancer Summary ===");
        int totalTasks = 0;
        for (Server server : servers) {
            int count = server.getTasksCompleted();
            long busyTime = server.getTotalBusyTime();
            double avgBurst = count == 0 ? 0 : (double) busyTime / count;
            totalTasks += count;
            System.out.printf("Server-%d: %d tasks | avg burst %.0fms | total busy time %dms%n",
                    server.getServerId(), count, avgBurst, busyTime);
        }
        System.out.println("Total tasks processed: " + totalTasks);
    }
}