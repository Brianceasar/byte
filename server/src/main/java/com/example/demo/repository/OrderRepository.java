public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserEmail(String email);
}

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
