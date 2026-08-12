package cloudloadbalancer;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class LoadBalancer {
    private final List<Server> servers;
    private final AtomicInteger nextServerIndex = new AtomicInteger(0);

    public LoadBalancer(List<Server> servers) {
        this.servers = servers;
    }

    // Round Robin: pick the next server in rotation, wrap around at the end
    public void dispatch(Task task) {
        int index = nextServerIndex.getAndUpdate(i -> (i + 1) % servers.size());
        Server chosen = servers.get(index);
        System.out.println("[LoadBalancer] Dispatching " + task + " -> Server-" + chosen.getServerId());
        chosen.assignTask(task);
    }
}