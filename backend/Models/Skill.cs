namespace PortfolioApi.Models
{
    public class Skill
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string ProficiencyLevel { get; set; } = string.Empty; // e.g., 'Beginner', 'Intermediate', 'Advanced'
    }
}
