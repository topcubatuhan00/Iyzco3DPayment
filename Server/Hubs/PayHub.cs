using Microsoft.AspNetCore.SignalR;

namespace Server.Hubs;

public class PayHub : Hub
{
    public static readonly IDictionary<string, string> connections = new Dictionary<string, string>();

    public void RegisterTransaction(string id)
    {
        var connectionId = Context.ConnectionId;
        connections[id] = connectionId;
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        var connectionId = Context.ConnectionId;
        var item = connections.FirstOrDefault(p => p.Value == connectionId);
        connections.Remove(connectionId);
        return base.OnDisconnectedAsync(exception);
    }
}
