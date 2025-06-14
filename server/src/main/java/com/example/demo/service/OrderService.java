@Service
public class OrderService {
    private final OrderRepository orderRepo;

    public OrderService(OrderRepository orderRepo) {
        this.orderRepo = orderRepo;
    }

    public Order saveOrder(OrderRequest request) {
        Order order = new Order();
        order.setUserEmail(request.getUserEmail());
        order.setCreatedAt(new Date());
        order.setTotal(request.getTotal());

        List<OrderItem> items = request.getItems().stream().map(i -> {
            OrderItem item = new OrderItem();
            item.setProductName(i.getProductName());
            item.setQuantity(i.getQuantity());
            item.setPrice(i.getPrice());
            item.setOrder(order);
            return item;
        }).toList();

        order.setItems(items);
        return orderRepo.save(order);
    }

    public List<Order> getUserOrders(String email) {
        return orderRepo.findByUserEmail(email);
    }

    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }
}
