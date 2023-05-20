using System;
using System.Collections.Generic;

namespace STGenetics.Models
{
    public partial class Element
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Breed { get; set; }
        public DateTime? BirthDate { get; set; }
        public string? Sex { get; set; }
        public decimal? Price { get; set; }
        public bool? Status { get; set; }
    }
}
