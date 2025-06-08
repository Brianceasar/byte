import java.security.SecureRandom;
import java.util.Base64;

public class KeyGenerator {
    public static void main(String[] args) {
        // Generate 64 bytes (512 bits) for HS512 algorithm
        SecureRandom random = new SecureRandom();
        byte[] keyBytes = new byte[64];
        random.nextBytes(keyBytes);
        
        // Encode to Base64 for easy storage
        String base64Key = Base64.getEncoder().encodeToString(keyBytes);
        
        System.out.println("Generated secure JWT key (512 bits):");
        System.out.println(base64Key);
        System.out.println();
        System.out.println("jwt.secret=" + base64Key);
    }
}