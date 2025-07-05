using Core.Domain.Entities;

namespace Core.Domain.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResult> LoginAsync(string email, string password);
        Task<AuthResult> RegisterAsync(string email, string password, string firstName, string lastName, UserRole role);
        Task<AuthResult> LoginWithGoogleAsync(string googleCredential);
        string GenerateJwtToken(User user);
    }

    public class AuthResult
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public User? User { get; set; }
    }
}
