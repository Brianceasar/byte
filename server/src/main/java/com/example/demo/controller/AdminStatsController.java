@RestController
@RequestMapping("/admin")
public class AdminStatsController {

    private final UserRepository userRepo;
    private final ProductRepository productRepo;
    private final OrderRepository orderRepo;

    public AdminStatsController(UserRepository u, ProductRepository p, OrderRepository o) {
        this.userRepo = u;
        this.productRepo = p;
        this.orderRepo = o;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userRepo.count());
        stats.put("totalProducts", productRepo.count());
        stats.put("totalOrders", orderRepo.count());
        return ResponseEntity.ok(stats);
    }
}
