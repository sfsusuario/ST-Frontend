using System;
using System.Collections.Generic;

namespace STGenetics.Models
{
    public partial class Element
    {
        /// <summary>
        /// Item identifier
        /// </summary>
        /// <value>Id</value>
        public int Id { get; set; }

        /// <summary>
        /// Item name
        /// </summary>
        /// <value>Name</value>
        public string? Name { get; set; }

        /// <summary>
        /// Item breed
        /// </summary>
        /// <value>Breed</value>
        public string? Breed { get; set; }

        /// <summary>
        /// Item birth date
        /// </summary>
        /// <value>BirthDate</value>
        public DateTime? BirthDate { get; set; }

        /// <summary>
        /// Item sex
        /// </summary>
        /// <value>Sex</value>
        public string? Sex { get; set; }

        /// <summary>
        /// Item price
        /// </summary>
        /// <value>Price</value>
        public decimal? Price { get; set; }

        /// <summary>
        /// Item status
        /// </summary>
        /// <value>Status</value>
        public bool? Status { get; set; }
    }
}
